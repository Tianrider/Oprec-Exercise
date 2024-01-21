import './Home.css';
import Footer from '../components/Footer';
import { useRef } from 'react';

const Home = () => {
    const works = useRef(null);

    const scrollToWorks = () => {
        works.current?.scrollIntoView({ behavior: "smooth" });
    }

    return (
    <div className='home'>
        <div className='home-container'>
            <div className='containers title'>
                <div>
                <img src='https://raw.githubusercontent.com/ExerciseFTUI/Website-Exercise-FE/main/src/assets/exercise-logos.svg' className='img-fluid' ></img>
                </div>
                <div>
                    <h2>Tugas Oprec</h2>
                    <h1>Christian Hadiwijaya</h1>
                    <h3>Teknik Komputer 2023</h3>
                </div>
            </div>
            <a className="scrolldown text-center container" onClick={scrollToWorks}>
                    <span></span>
                    <span></span>
            </a>
        </div>
        <div className='works-container containers' ref={works}>
            <a href='/Oprec-Exercise/#/temperature' className="works-card temconter">
                <div className="content text-center">
                    <h1>TemConTer</h1>
                    <p>Temperature Converter</p>
                </div>
            </a>
            <a href='/Oprec-Exercise/#/currency' className='works-card curconter'>
                <div className="content text-center">
                    <h1>CurConTer</h1>
                    <p>Currrency Converter</p>
                </div>
            </a>
        </div>
        <Footer />
    </div>
    );
}

export default Home;