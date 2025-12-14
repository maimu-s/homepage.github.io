import { useEffect, useState } from 'react';
import './Header.css';
import logo from '../assets/images/logo/logo.png';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string): void => {
        if (sectionId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsMobileMenuOpen(false);
            return;
        }

        const element = document.getElementById(sectionId);
        if (element) {
            // ヘッダー要素から実際の高さを取得
            const header = document.querySelector('.header') as HTMLElement;
            const headerHeight = header ? header.offsetHeight : 70;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <div className="header-logo">
                    <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
                        <img src={logo} alt="鈴音舞夢" />
                    </a>
                </div>

                <button
                    className="mobile-menu-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="メニュー"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`header-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <li>
                            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
                                HOME
                            </a>
                        </li>
                        <li>
                            <a href="#news" onClick={(e) => { e.preventDefault(); scrollToSection('news'); }}>
                                NEWS
                            </a>
                        </li>
                        <li>
                            <a href="#talent" onClick={(e) => { e.preventDefault(); scrollToSection('talent'); }}>
                                TALENT
                            </a>
                        </li>
                        <li>
                            <a href="#schedule" onClick={(e) => { e.preventDefault(); scrollToSection('schedule'); }}>
                                SCHEDULE
                            </a>
                        </li>
                        <li>
                            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                                CONTACT
                            </a>
                        </li>
                    </ul>

                    <div className="header-social">
                        <a href="https://x.com/bc_hakumai" target="_blank" rel="noopener noreferrer" aria-label="X/Twitter">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/@suzunemaimu" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                        </a>
                        <a href="https://www.twitch.tv/suzunemaimu" target="_blank" rel="noopener noreferrer" aria-label="Twitch">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                            </svg>
                        </a>
                        <a href="https://suzune-maimu.booth.pm/" target="_blank" rel="noopener noreferrer" aria-label="BOOTH">
                            <svg width="20" height="20" viewBox="150 150 700 700" fill="currentColor">
                                <path fillRule="evenodd" clipRule="evenodd" d="M773.828 438.341V389.068L650.744 192H608.227L541.093 353.238L475.077 214.446L438.138 214.382L326.272 478.653V227.833H250.172V250.007H192V327.26H250.172V550.306C250.172 570.098 266.227 586.141 286.004 586.141H324.033V832L401.683 831.946C401.683 831.946 401.695 720.762 401.695 720.644C401.695 658.964 455.026 608.963 520.963 608.563C521.198 608.563 521.445 608.535 521.707 608.535H521.744H521.786H521.875C629.722 608.612 717.139 690.28 717.139 790.983V832H773.828V611.427H832V489.487L773.828 438.341Z"/>
                            </svg>
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
