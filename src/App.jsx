import Button from "./components/ui/Button.jsx";
import Card from "./components/ui/Card.jsx";
import { SECTION_ITEMS } from "./config/navigation.js";
import { SITE } from "./config/site.js";
import "./App.css";

/** Home page. Chrome (top bar, footer) comes from Layout. */
function App() {
  return (
    <>
      <section className="home-hero">
        <div className="container">
          <h1 className="home-hero__title">{SITE.name}</h1>
          <p className="home-hero__subtitle">{SITE.tagline}</p>

          <div className="home-hero__actions">
            <Button to="/cultural-map">Open Cultural Map</Button>
            <Button to="/story" variant="secondary">
              Read the Stories
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">About the project</h2>
          <p className="prose">{SITE.intro}</p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <h2 className="section__title">Explore</h2>
          <div className="home-cards">
            {SECTION_ITEMS.map((item) => (
              <Card
                key={item.path}
                title={item.label}
                description={item.description}
                to={item.path}
                linkLabel={`View ${item.label.toLowerCase()}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <div className="home-about">
            <h2 className="section__title">How it was made</h2>
            <p className="prose">{SITE.about}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
