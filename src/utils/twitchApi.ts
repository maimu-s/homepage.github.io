/**
 * Twitch配信情報取得モジュール（Twitch RSS使用・認証不要版）
 * @module twitchApi
 * @see https://twitchrss.appspot.com/
 */

/** Twitchライブ配信の情報 */
export interface TwitchStream {
    id: string;
    title: string;
    thumbnail: string;
    startedAt: string;
    url: string;
    viewerCount: number;
    isLive: boolean;
}

/** TwitchVOD（アーカイブ）の情報 */
export interface TwitchVideo {
    id: string;
    title: string;
    thumbnail: string;
    publishedAt: string;
    url: string;
    duration: string;
}

// チャンネル設定
const TWITCH_CHANNEL_NAME = import.meta.env.VITE_TWITCH_CHANNEL_NAME || 'suzunemaimu';

// RSS URL（開発環境ではプロキシ経由、本番環境ではCORSプロキシ経由）
const RSS_URL = import.meta.env.DEV
    ? `/api/twitch-rss/vod/${TWITCH_CHANNEL_NAME}`
    : `https://corsproxy.io/?${encodeURIComponent(`https://twitchrss.appspot.com/vod/${TWITCH_CHANNEL_NAME}`)}`;

// キャッシュ設定
const CACHE_KEY = 'twitch_rss_cache';
const CACHE_DURATION_MS = 15 * 60 * 1000; // 15分

// 配信中判定のしきい値
const LIVE_THRESHOLD_MINUTES = 5;

interface CachedRSSData {
    stream: TwitchStream | null;
    videos: TwitchVideo[];
    timestamp: number;
}

// キャッシュから取得
function getCachedData(): { stream: TwitchStream | null; videos: TwitchVideo[] } | null {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const { stream, videos, timestamp }: CachedRSSData = JSON.parse(cached);
        const now = Date.now();

        if (now - timestamp < CACHE_DURATION_MS) {
            return { stream, videos };
        }
        return null;
    } catch (error) {
        console.error('Cache read error:', error);
        return null;
    }
}

// キャッシュに保存
function setCachedData(stream: TwitchStream | null, videos: TwitchVideo[]): void {
    try {
        const cacheData: CachedRSSData = {
            stream,
            videos,
            timestamp: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
        console.error('Cache write error:', error);
    }
}

// RSSフィードからTwitch配信情報を取得
async function fetchTwitchRSS(): Promise<{ stream: TwitchStream | null; videos: TwitchVideo[] }> {
    try {
        const response = await fetch(RSS_URL);
        if (!response.ok) {
            throw new Error(`RSS fetch failed: ${response.status}`);
        }

        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        const items = xmlDoc.querySelectorAll('item');
        const videos: TwitchVideo[] = [];
        let liveStream: TwitchStream | null = null;

        items.forEach((item, index) => {
            // 最新10件のみ処理
            if (index >= 10) return;

            const title = item.querySelector('title')?.textContent || '';
            const link = item.querySelector('link')?.textContent || '';
            const guid = item.querySelector('guid')?.textContent || '';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            const category = item.querySelector('category')?.textContent || 'archive';

            // サムネイル画像をdescriptionから抽出
            const description = item.querySelector('description')?.textContent || '';
            const thumbnailMatch = description.match(/src="([^"]+)"/);
            const thumbnail = thumbnailMatch ? thumbnailMatch[1] : '';

            // 配信中かチェック（最新のarchiveアイテムの日付が最近なら配信中の可能性）
            const pubDateTime = new Date(pubDate);
            const now = new Date();
            const diffMinutes = (now.getTime() - pubDateTime.getTime()) / (1000 * 60);

            // 最新の動画がしきい値以内の場合は配信中と判断
            if (index === 0 && category === 'archive' && diffMinutes < LIVE_THRESHOLD_MINUTES) {
                liveStream = {
                    id: guid,
                    title: title,
                    thumbnail: thumbnail,
                    startedAt: pubDateTime.toISOString(),
                    url: link,
                    viewerCount: 0, // RSSでは取得不可
                    isLive: true
                };
            }

            // アーカイブ動画として追加（highlightは除外）
            if (category === 'archive') {
                videos.push({
                    id: guid,
                    title: title,
                    thumbnail: thumbnail,
                    publishedAt: pubDateTime.toISOString(),
                    url: link,
                    duration: '' // RSSでは取得不可
                });
            }
        });

        return { stream: liveStream, videos };
    } catch (error) {
        console.error('Failed to fetch Twitch RSS:', error);
        throw error;
    }
}

// 配信状態を取得
export async function fetchTwitchStream(forceRefresh = false): Promise<TwitchStream | null> {
    // キャッシュチェック
    if (!forceRefresh) {
        const cached = getCachedData();
        if (cached) {
            console.log('Using cached Twitch stream data');
            return cached.stream;
        }
    }

    try {
        const { stream, videos } = await fetchTwitchRSS();
        setCachedData(stream, videos);
        return stream;
    } catch (error) {
        console.error('Failed to fetch Twitch stream:', error);
        const cached = getCachedData();
        return cached?.stream || null;
    }
}

// VODを取得
export async function fetchTwitchVideos(forceRefresh = false): Promise<TwitchVideo[]> {
    // キャッシュチェック
    if (!forceRefresh) {
        const cached = getCachedData();
        if (cached) {
            console.log('Using cached Twitch videos data');
            return cached.videos;
        }
    }

    try {
        const { stream, videos } = await fetchTwitchRSS();
        setCachedData(stream, videos);
        return videos;
    } catch (error) {
        console.error('Failed to fetch Twitch videos:', error);
        const cached = getCachedData();
        return cached?.videos || [];
    }
}

// 実際のTwitch配信ページへのリンク
export function getTwitchChannelUrl(): string {
    return `https://www.twitch.tv/${TWITCH_CHANNEL_NAME}`;
}

// Twitch埋め込みプレーヤーURL
export function getTwitchEmbedUrl(): string {
    return `https://player.twitch.tv/?channel=${TWITCH_CHANNEL_NAME}&parent=${window.location.hostname}`;
}
