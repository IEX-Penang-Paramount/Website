
import React from "react";
import "./IndexPage.css";
import { Link } from "react-router-dom";
import { NavigationBar } from "./Reusables/TopComponents/NavigationBar";
import { TopBar } from "./Reusables/TopComponents/TopBar";

function App() {
  return (
    <div className="page">
      {/* Top bar */}
      <TopBar/>


      {/* Screen / Hero area */}
      <main className="content">
        <section className="hero" aria-label="Index hero">
          {/* Background image area */}
          <div className="hero__media" role="img" aria-label="Background image" />

          {/* Overlay label box */}
          <div className="hero__labelWrap">
            <div className="hero__label">
              <div className="hero__labelTitle">PROJECT PARAMOUNT</div>
              <div className="hero__labelSubtitle">
                Cultural map & stories of the fishing community
              </div>
            </div>
          </div>

          {/* Optional intro content under the hero image */}
          <div className="hero__footer">
            <p className="hero__blurb">
              Explore places, practices, and oral histories—then dive deeper through glossary entries and
              curated story chapters.
            </p>

            <div className="hero__ctaRow">
              <a className="cta cta--primary" href="#map">
                Open Cultural Map
              </a>
              <a className="cta cta--ghost" href="#story">
                Start Story Mode
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer (lightweight) */}
      <footer className="footer">
        <div className="footer__inner">
          <span>© {new Date().getFullYear()} Project Paramount</span>
          <span className="footer__dot" aria-hidden="true">
            •
          </span>
          <a className="footer__link" href="#about">
            About
          </a>
        </div>
      </footer>
    </div>
  );
}


export default App
