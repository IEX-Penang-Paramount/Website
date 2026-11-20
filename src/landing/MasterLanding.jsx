import { Link } from "react-router-dom";
import { PROJECTS } from "../projects/index.js";
import "./MasterLanding.css";

const [paramount, sungaiBatu] = PROJECTS;

function MasterLanding() {
  return (
    <main className="master-landing">
      <title>Penang Coastal Histories</title>
      <header className="master-header">
        <Link className="master-brand" to="/" aria-label="Penang Coastal Histories home">
          <span>Penang Coastal Histories</span>
        </Link>
        <a className="master-header__link" href="#projects">See both projects <span aria-hidden="true">↘</span></a>
      </header>

      <section className="master-intro" aria-labelledby="master-title" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,32,46,.82), rgba(5,32,46,.32)), url(${import.meta.env.BASE_URL}paramount-photos/outSea_expanded.jpg)` }}>
        <div className="master-intro__copy">
          <p className="master-kicker">Penang’s fishing communities</p>
          <h1 id="master-title">Stories from<br /><em>the shoreline.</em></h1>
          <p className="master-intro__lead">
            Two fishing communities, two stretches of shoreline. Explore the places,
            words and stories that hold their ways of life.
          </p>
          <a className="master-intro__cta" href="#projects">Begin exploring <span aria-hidden="true">↓</span></a>
        </div>
        <div className="master-intro__shore" aria-hidden="true">
          <svg viewBox="0 0 620 420" fill="none" preserveAspectRatio="xMidYMid meet">
            <path d="M-25 173C95 120 151 149 253 188c91 35 169 20 270-31 56-28 109-31 154-26" />
            <path d="M-28 205c120-53 176-24 278 15 91 35 169 20 270-31 56-28 109-31 154-26" />
            <path d="M-31 237c120-53 176-24 278 15 91 35 169 20 270-31 56-28 109-31 154-26" />
            <path d="M-34 269c120-53 176-24 278 15 91 35 169 20 270-31 56-28 109-31 154-26" />
            <path d="M-37 301c120-53 176-24 278 15 91 35 169 20 270-31 56-28 109-31 154-26" />
          </svg>
        </div>
        <svg className="master-intro__transition" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true"><path d="M0 115C310 18 580 28 760 72c215 52 430 85 680-52v120H0Z" /></svg>
      </section>

      <section className="master-projects" id="projects" aria-labelledby="master-projects-title">
        <div className="master-projects__head">
          <div>
            <p className="master-kicker">From north to south</p>
            <h2 id="master-projects-title">Choose a shoreline</h2>
          </div>
          <p>Each project has its own stories, cultural map and glossary.</p>
        </div>

        <div className="master-project-grid">
          <article className="master-project master-project--paramount">
            <div
              className="master-project__image"
              role="img"
              aria-label="View from a fishing boat off Paramount"
              style={{ backgroundImage: `linear-gradient(0deg, rgba(12,25,25,.37), transparent 40%), url(${import.meta.env.BASE_URL}paramount-photos/outSea_expanded.jpg)` }}
            />
            <div className="master-project__body">
              <div className="master-project__topline"><span>Northern Penang</span><span>Oral histories</span></div>
              <h3>Paramount</h3>
              <p>{paramount.getSummary()}</p>
              <Link to={paramount.getBasePath()} className="master-project__link">
                Enter Project Paramount <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>

          <article className="master-project master-project--sungai">
            <div className="master-project__graphic" aria-hidden="true">
              <span className="master-project__graphic-no">02</span>
              <span className="master-project__graphic-rule" />
              <span className="master-project__graphic-caption">The southern coast<br />Sungai Batu</span>
            </div>
            <div className="master-project__body">
              <div className="master-project__topline"><span>Southern Penang</span><span>Project Nelayan</span></div>
              <h3>Sungai Batu</h3>
              <p>{sungaiBatu.getSummary()}</p>
              <Link to={sungaiBatu.getBasePath()} className="master-project__link">
                Enter Project Nelayan <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        </div>
      </section>

      <footer className="master-footer">
        <span>Penang Coastal Histories</span>
        <span>Stories of fishing life around Penang</span>
        <a href="#master-title">Back to top ↑</a>
      </footer>
    </main>
  );
}

export default MasterLanding;
