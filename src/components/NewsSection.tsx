import { useState, useEffect } from 'react';
import './NewsSection.css';
import { fetchNews, type NewsItem } from '../utils/newsApi';

function NewsSection() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // ニュース取得
    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        setIsLoading(true);
        try {
            const newsData = await fetchNews();
            setNews(newsData);
        } catch (error) {
            console.error('ニュース取得エラー:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const openNewsDetail = (newsItem: NewsItem) => {
        setSelectedNews(newsItem);
    };

    const closeNewsDetail = () => {
        setSelectedNews(null);
    };

    return (
        <section className="news-section" id="news">
            <div className="news-container">
                <h2 className="news-title">
                    <span className="title-en">NEWS</span>
                    <span className="title-ja">お知らせ</span>
                </h2>

                {isLoading ? (
                    <div className="news-loading">読み込み中...</div>
                ) : news.length === 0 ? (
                    <div className="news-empty">お知らせはまだありません</div>
                ) : (
                    <div className="news-list">
                        {news.map((newsItem) => (
                            <div
                                key={newsItem.id}
                                className="news-item"
                                onClick={() => openNewsDetail(newsItem)}
                            >
                                <time className="news-date">{newsItem.date}</time>
                                {newsItem.category && (
                                    <span className="news-category">{newsItem.category}</span>
                                )}
                                <p className="news-item-title">{newsItem.title}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ポップアップモーダル */}
            {selectedNews && (
                <div className="news-modal" onClick={closeNewsDetail}>
                    <div className="news-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="news-modal-close" onClick={closeNewsDetail}>
                            ×
                        </button>
                        <div className="news-modal-header">
                            <time className="news-modal-date">{selectedNews.date}</time>
                            {selectedNews.category && (
                                <span className="news-modal-category">{selectedNews.category}</span>
                            )}
                        </div>
                        <h3 className="news-modal-title">{selectedNews.title}</h3>
                        <div className="news-modal-body">
                            <div className="news-modal-content-wrapper">
                                <div className="news-modal-text">
                                    <p style={{ whiteSpace: 'pre-wrap' }}>{selectedNews.content}</p>
                                </div>
                                {selectedNews.imageUrl && (
                                    <div className="news-modal-image-wrapper">
                                        <img
                                            src={selectedNews.imageUrl}
                                            alt={selectedNews.title}
                                            className="news-modal-image"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default NewsSection;
