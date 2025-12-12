/**
 * スケジュールデータ統合モジュール
 * YouTubeとTwitchの配信情報を統合して提供
 * @module scheduleApi
 */

import { fetchYouTubeVideos, type YouTubeVideo } from './youtubeApi';
import { fetchTwitchStream, fetchTwitchVideos, type TwitchStream, type TwitchVideo } from './twitchApi';

/** 配信プラットフォーム */
export type Platform = 'YouTube' | 'Twitch';

/** 配信ステータス */
export type ScheduleStatus = '配信予定' | '配信中' | 'アーカイブ';

/** 統合スケジュールアイテム */
export interface ScheduleItem {
    id: string;
    title: string;
    platform: Platform;
    status: ScheduleStatus;
    dateTime: string;
    url: string;
    thumbnail?: string;
    viewerCount?: number;
}

// YouTube動画をScheduleItemに変換
function youtubeToScheduleItem(video: YouTubeVideo): ScheduleItem {
    let status: ScheduleStatus = 'アーカイブ';
    let dateTime = video.publishedAt;

    if (video.isLive) {
        status = '配信中';
    } else if (video.scheduledStartTime) {
        const scheduledTime = new Date(video.scheduledStartTime);
        const now = new Date();

        // 予定時刻が未来なら「配信予定」、過去なら「アーカイブ」
        if (scheduledTime > now) {
            status = '配信予定';
            dateTime = video.scheduledStartTime;
        } else {
            status = 'アーカイブ';
            dateTime = video.publishedAt;
        }
    }

    return {
        id: `youtube-${video.id}`,
        title: video.title,
        platform: 'YouTube',
        status,
        dateTime,
        url: video.url,
        thumbnail: video.thumbnail
    };
}

// TwitchストリームをScheduleItemに変換
function twitchStreamToScheduleItem(stream: TwitchStream): ScheduleItem {
    return {
        id: `twitch-stream-${stream.id}`,
        title: stream.title,
        platform: 'Twitch',
        status: '配信中',
        dateTime: stream.startedAt,
        url: stream.url,
        thumbnail: stream.thumbnail,
        viewerCount: stream.viewerCount
    };
}

// TwitchビデオをScheduleItemに変換
function twitchVideoToScheduleItem(video: TwitchVideo): ScheduleItem {
    return {
        id: `twitch-video-${video.id}`,
        title: video.title,
        platform: 'Twitch',
        status: 'アーカイブ',
        dateTime: video.publishedAt,
        url: video.url,
        thumbnail: video.thumbnail
    };
}

// すべてのスケジュールデータを取得
export async function fetchAllSchedules(forceRefresh = false): Promise<ScheduleItem[]> {
    try {
        console.log('[scheduleApi] Fetching all schedules...');
        const [youtubeVideos, twitchStream, twitchVideos] = await Promise.all([
            fetchYouTubeVideos(forceRefresh),
            fetchTwitchStream(forceRefresh),
            fetchTwitchVideos(forceRefresh)
        ]);

        console.log('[scheduleApi] YouTube videos:', youtubeVideos.length);
        console.log('[scheduleApi] Twitch stream:', twitchStream);
        console.log('[scheduleApi] Twitch videos:', twitchVideos.length);

        const schedules: ScheduleItem[] = [];

        // YouTube動画を追加
        youtubeVideos.forEach(video => {
            schedules.push(youtubeToScheduleItem(video));
        });

        // Twitchライブ配信を追加
        if (twitchStream) {
            schedules.push(twitchStreamToScheduleItem(twitchStream));
        }

        // TwitchVODを追加
        twitchVideos.forEach(video => {
            schedules.push(twitchVideoToScheduleItem(video));
        });

        // 投稿時系列順（新しい順）でソート
        schedules.sort((a, b) => {
            const dateA = new Date(a.dateTime).getTime();
            const dateB = new Date(b.dateTime).getTime();
            return dateB - dateA; // 新しい順
        });

        // 最大10件に制限
        const limitedSchedules = schedules.slice(0, 10);

        console.log('[scheduleApi] Final schedules:', limitedSchedules.length, 'items');
        console.log('[scheduleApi] Sorted by date:', limitedSchedules.map(s => ({
            title: s.title.substring(0, 30),
            platform: s.platform,
            date: new Date(s.dateTime).toLocaleString('ja-JP')
        })));

        return limitedSchedules;
    } catch (error) {
        console.error('Failed to fetch schedules:', error);
        return [];
    }
}

// 自動更新の間隔を計算（ミリ秒）
export function getUpdateInterval(): number {
    const now = new Date();
    const hour = now.getHours();

    // 深夜帯 (3:00-9:00): 30分
    if (hour >= 3 && hour < 9) {
        return 30 * 60 * 1000;
    }

    // 通常時: 15分
    return 15 * 60 * 1000;
}
