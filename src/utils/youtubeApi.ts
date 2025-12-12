/**
 * YouTube Data API v3 統合モジュール
 * @module youtubeApi
 */

/** YouTube動画の情報 */
export interface YouTubeVideo {
    id: string;
    title: string;
    thumbnail: string;
    publishedAt: string;
    url: string;
    isLive: boolean;
    scheduledStartTime?: string;
}

// API設定
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

// キャッシュ設定
const CACHE_KEY = 'youtube_videos_cache';
const CACHE_DURATION_MS = 15 * 60 * 1000; // 15分

interface CachedData {
    data: YouTubeVideo[];
    timestamp: number;
}

// キャッシュから取得
function getCachedData(): YouTubeVideo[] | null {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const { data, timestamp }: CachedData = JSON.parse(cached);
        const now = Date.now();

        if (now - timestamp < CACHE_DURATION_MS) {
            return data;
        }
        return null;
    } catch (error) {
        console.error('Cache read error:', error);
        return null;
    }
}

// キャッシュに保存
function setCachedData(data: YouTubeVideo[]): void {
    try {
        const cacheData: CachedData = {
            data,
            timestamp: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
        console.error('Cache write error:', error);
    }
}

// YouTube動画を取得
export async function fetchYouTubeVideos(forceRefresh = false): Promise<YouTubeVideo[]> {
    // キャッシュチェック
    if (!forceRefresh) {
        const cached = getCachedData();
        if (cached) {
            console.log('Using cached YouTube data');
            return cached;
        }
    }

    if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
        console.error('YouTube API credentials not configured');
        return [];
    }

    try {
        // チャンネルの最新動画を検索
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?` +
            `key=${YOUTUBE_API_KEY}` +
            `&channelId=${YOUTUBE_CHANNEL_ID}` +
            `&part=snippet` +
            `&order=date` +
            `&maxResults=10` +
            `&type=video`;

        const searchResponse = await fetch(searchUrl);
        if (!searchResponse.ok) {
            throw new Error(`YouTube API error: ${searchResponse.status}`);
        }

        const searchData = await searchResponse.json();
        const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

        // 動画の詳細情報を取得
        const videosUrl = `https://www.googleapis.com/youtube/v3/videos?` +
            `key=${YOUTUBE_API_KEY}` +
            `&id=${videoIds}` +
            `&part=snippet,liveStreamingDetails`;

        const videosResponse = await fetch(videosUrl);
        if (!videosResponse.ok) {
            throw new Error(`YouTube API error: ${videosResponse.status}`);
        }

        const videosData = await videosResponse.json();

        const videos: YouTubeVideo[] = videosData.items.map((item: any) => ({
            id: item.id,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
            publishedAt: item.snippet.publishedAt,
            url: `https://www.youtube.com/watch?v=${item.id}`,
            isLive: item.snippet.liveBroadcastContent === 'live',
            scheduledStartTime: item.liveStreamingDetails?.scheduledStartTime
        }));

        // キャッシュに保存
        setCachedData(videos);

        return videos;
    } catch (error) {
        console.error('Failed to fetch YouTube videos:', error);
        // エラー時はキャッシュデータを返す
        return getCachedData() || [];
    }
}
