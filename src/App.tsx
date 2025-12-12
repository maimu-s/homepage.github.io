import Header from './components/Header';
import HeroSection from './components/HeroSection';
import NewsSection from './components/NewsSection';
import TalentSection from './components/TalentSection';
import ScheduleSection from './components/ScheduleSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import './css/style.css';

function App() {
    return (
        <div className="app">
            <Header />
            <main>
                <HeroSection />
                <NewsSection />
                <TalentSection />
                <ScheduleSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}

export default App;
