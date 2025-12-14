import './Footer.css';
import boothLogo from '../assets/images/icon/booth_logo_icon_white.svg';

interface SocialLink {
    name: string;
    url: string;
    icon: React.JSX.Element;
}

function Footer() {
    const currentYear: number = new Date().getFullYear();

    const socialLinks: SocialLink[] = [
        {
            name: 'X/Twitter',
            url: 'https://x.com/bc_hakumai',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
            )
        },
        {
            name: 'YouTube',
            url: 'https://www.youtube.com/@suzunemaimu',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
            )
        },
        {
            name: 'Twitch',
            url: 'https://www.twitch.tv/suzunemaimu',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
            )
        },
        {
            name: 'BOOTH',
            url: 'https://suzune-maimu.booth.pm/',
            icon: (
                <img src={boothLogo} alt="BOOTH" width="24" height="24" />
            )
        }
    ];

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-social">
                    {socialLinks.map((link: SocialLink) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.name}
                            className="social-link"
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

                <p className="footer-copyright">
                    掲載の記事・写真・イラスト等、全てのコンテンツの無断複製・転載を禁じます。<br />&copy; {currentYear} 鈴音舞夢. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
