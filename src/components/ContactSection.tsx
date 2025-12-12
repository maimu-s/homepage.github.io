import './ContactSection.css';

function ContactSection() {
    return (
        <section className="contact-section" id="contact">
            <div className="contact-container">
                <h2 className="contact-title">
                    <span className="title-en">CONTACT</span>
                    <span className="title-ja">お問い合わせ</span>
                </h2>

                <div className="contact-content">
                    <p className="contact-description">
                        お仕事のご依頼・ご相談は下記よりお気軽にお問い合わせください
                    </p>
                    <a
                        href="https://riot-music.com/rionection/contact/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-button"
                    >
                        お仕事のご連絡はこちらへ
                    </a>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;
