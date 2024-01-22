import "../style/Home.css";
import Footer from "../components/Footer";
import { useEffect, useRef, useState } from "react";
import exerciseLogo from "../assets/exercise-logos.svg";

const Home = () => {
  const TemConTer = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setVisible(entry.isIntersecting);
    });

    observer.observe(TemConTer.current);
  }, []);

  const scrollToWorks = () => {
    TemConTer.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home">
      <div className="home-container">
        <div className="containers title">
          <div>
            <img src={exerciseLogo} className="img-fluid"></img>
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
      <div className="works-container">
        <div className="containers">
          <a
            href="/Oprec-Exercise/#/temperature"
            className={`works-card temconter ${
              isVisible ? "showed" : "hidden"
            }`}
          >
            <div className="content text-center" ref={TemConTer}>
              <h1>TemConTer</h1>
              <p>Temperature Converter</p>
            </div>
          </a>
          <a
            href="/Oprec-Exercise/#/currency"
            className={`works-card curconter ${
              isVisible ? "showed" : "hidden"
            }`}
          >
            <div className="content text-center">
              <h1>CurConTer</h1>
              <p>Currrency Converter</p>
            </div>
          </a>
        </div>

        <div className="d-flex align-center justify-content-center pdf-container text-center">
          <h2>Tugas Essai</h2>
          <iframe
            src="https://drive.google.com/file/d/1riKXWfMxZcTMWAFmDjTSt4t2OfEzqkB6/preview"
            width="70%"
            height="100%"
            allow="autoplay"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
