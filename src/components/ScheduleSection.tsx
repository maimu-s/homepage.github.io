import { useState, useEffect, useRef } from 'react';
import './ScheduleSection.css';
import { fetchAllSchedules, getUpdateInterval, type ScheduleItem, type Platform } from '../utils/scheduleApi';

function ScheduleSection() {
    const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // スケジュールを取得
    const loadSchedules = async (forceRefresh = false) => {
        setLoading(true);
        setError(null);

        try {
            console.log('[ScheduleSection] Fetching schedules...');
            const data = await fetchAllSchedules(forceRefresh);
            console.log('[ScheduleSection] Fetched schedules:', data.length, 'items');
            console.log('[ScheduleSection] Schedule data:', data);
            setSchedules(data);
        } catch (err) {
            setError('スケジュールの取得に失敗しました');
            console.error('[ScheduleSection] Error fetching schedules:', err);
        } finally {
            setLoading(false);
        }
    };

    // 初回読み込みと自動更新
    useEffect(() => {
        loadSchedules();

        const updateInterval = getUpdateInterval();
        const intervalId = setInterval(() => {
            loadSchedules();
        }, updateInterval);

        return () => clearInterval(intervalId);
    }, []);

    // 配信中の場合は5分間隔で更新
    useEffect(() => {
        const hasLiveStream = schedules.some(s => s.status === '配信中');

        if (hasLiveStream) {
            const liveInterval = setInterval(() => {
                loadSchedules();
            }, 5 * 60 * 1000); // 5分

            return () => clearInterval(liveInterval);
        }
    }, [schedules]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const getPlatformIcon = (platform: Platform) => {
        if (platform === 'YouTube') {
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
            );
        } else {
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
            );
        }
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = date.getTime() - now.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) {
            return `${diffDays}日後`;
        } else if (diffHours > 0) {
            return `${diffHours}時間後`;
        } else if (diffMs > 0) {
            return '間もなく';
        }

        return date.toLocaleDateString('ja-JP', {
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <section id="schedule" className="schedule-section">
            <div className="schedule-container">
                <div className="schedule-header">
                    <h2 className="section-title">
                        <span className="title-en">SCHEDULE</span>
                        <span className="title-ja">スケジュール</span>
                    </h2>
                </div>

                {loading && schedules.length === 0 ? (
                    <div className="loading">読み込み中...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : (
                    <div className="schedule-wrapper">
                        <button
                            className="scroll-button scroll-button-left"
                            onClick={() => scroll('left')}
                            aria-label="前へ"
                        >
                            &lt;
                        </button>

                        <div className="schedule-list" ref={scrollContainerRef}>
                            {schedules.map((item) => (
                                <a
                                    key={item.id}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="schedule-card"
                                >
                                    <div className="schedule-thumbnail">
                                        {item.thumbnail ? (
                                            <img src={item.thumbnail} alt={item.title} />
                                        ) : (
                                            <div className="thumbnail-placeholder">
                                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                </svg>
                                            </div>
                                        )}
                                        <span className={`status-badge status-${item.status}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <div className="schedule-info">
                                        <h3 className="schedule-title">{item.title}</h3>
                                        <div className="schedule-meta">
                                            <span className="platform-icon">
                                                {getPlatformIcon(item.platform)}
                                                {item.platform}
                                            </span>
                                            <span className="schedule-date">
                                                {formatDate(item.dateTime)}
                                            </span>
                                        </div>
                                        {item.viewerCount !== undefined && (
                                            <div className="viewer-count">
                                                👁️ {item.viewerCount.toLocaleString()} 視聴中
                                            </div>
                                        )}
                                    </div>
                                </a>
                            ))}
                        </div>

                        <button
                            className="scroll-button scroll-button-right"
                            onClick={() => scroll('right')}
                            aria-label="次へ"
                        >
                            &gt;
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ScheduleSection;
