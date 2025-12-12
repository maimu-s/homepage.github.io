import { createClient } from 'microcms-js-sdk';

export interface MicroCMSNewsItem {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    title: string;
    content: string;
    category?: string;
    image?: {
        url: string;
        height: number;
        width: number;
    };
}

export interface NewsItem {
    id: string;
    date: string;
    title: string;
    content: string;
    category?: string;
    imageUrl?: string;
}

const serviceDomain = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;

// microCMSクライアント初期化
const client = serviceDomain && apiKey ? createClient({
    serviceDomain,
    apiKey,
}) : null;

// キャッシュキー
const CACHE_KEY = 'maimu_news_cache';
const CACHE_DURATION = 15 * 60 * 1000; // 15分

interface CachedData {
    news: NewsItem[];
    timestamp: number;
}

/**
 * ニュース一覧を取得（microCMS → キャッシュ → フォールバック）
 */
export async function fetchNews(): Promise<NewsItem[]> {
    // キャッシュチェック
    const cached = getCache();
    if (cached && cached.length > 0) {
        console.log('キャッシュからニュースを取得:', cached.length + '件');
        return cached;
    }

    // microCMSから取得
    if (client) {
        try {
            console.log('microCMSからニュースを取得中...');
            const response = await client.get<{ contents: MicroCMSNewsItem[] }>({
                endpoint: 'news',
                queries: {
                    limit: 10,
                    orders: '-publishedAt',
                },
            });

            if (response.contents && response.contents.length > 0) {
                const news = response.contents.map(transformNewsItem);
                saveCache(news);
                console.log('microCMSから取得成功:', news.length + '件');
                return news;
            }
        } catch (error) {
            console.error('microCMSからのニュース取得に失敗:', error);
        }
    } else {
        console.log('microCMS未設定: モックデータを使用');
    }

    // フォールバック: モックデータ
    const mockNews = getMockNews();
    console.log('モックデータを返却:', mockNews.length + '件');
    return mockNews;
}

/**
 * microCMSのニュースアイテムを変換
 */
function transformNewsItem(item: MicroCMSNewsItem): NewsItem {
    const date = new Date(item.publishedAt);
    const formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

    return {
        id: item.id,
        date: formattedDate,
        title: item.title,
        content: item.content,
        category: item.category,
        imageUrl: item.image?.url,
    };
}

/**
 * キャッシュから取得
 */
function getCache(): NewsItem[] | null {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const data: CachedData = JSON.parse(cached);
        const now = Date.now();

        if (now - data.timestamp < CACHE_DURATION) {
            return data.news;
        }

        // 期限切れキャッシュを削除
        localStorage.removeItem(CACHE_KEY);
    } catch (error) {
        console.error('キャッシュ読み込みエラー:', error);
    }

    return null;
}

/**
 * キャッシュに保存
 */
function saveCache(news: NewsItem[]): void {
    try {
        // 空のデータはキャッシュしない
        if (news.length === 0) {
            console.warn('空のニュースデータはキャッシュしません');
            return;
        }
        const data: CachedData = {
            news,
            timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('キャッシュ保存エラー:', error);
    }
}

/**
 * モックデータ取得
 */
function getMockNews(): NewsItem[] {
    return [
        {
            id: '1',
            date: '2025.12.12',
            title: 'ウェブサイトをリニューアルしました！',
            content: '鈴音舞夢の公式ウェブサイトをリニューアルオープンしました。今後ともよろしくお願いいたします！',
            category: 'お知らせ'
        },
        {
            id: '2',
            date: '2025.12.10',
            title: 'YouTube チャンネル登録者数1000人突破！',
            content: 'YouTubeチャンネルの登録者数が1000人を突破しました！いつも応援ありがとうございます！これからもたくさん配信していきますので、よろしくお願いします！',
            category: '活動報告'
        },
        {
            id: '3',
            date: '2025.12.05',
            title: '初配信アーカイブ公開中',
            content: '初配信のアーカイブをYouTubeで公開しています。ぜひご覧ください！',
            category: '配信情報'
        }
    ];
}
