import { useState, useMemo } from "react";
import PageHeader from "../components/ui/PageHeader.jsx";
import {
  getRootPins,
  getChildren,
  isSuperPin,
  CATEGORIES,
  getPinColor,
} from "./data/index.js";
import MapView from "./MapView.jsx";
import LocationPanel from "./LocationPanel.jsx";
import BackButton from "./BackButton.jsx";
import "./CulturalMapMain.css";

function countLeaves(pin) {
  const kids = getChildren(pin);
  if (kids.length === 0) return 1;
  return kids.reduce((n, k) => n + countLeaves(k), 0);
}

function CulturalMapMain() {
  const [navStack, setNavStack] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const roots = useMemo(() => getRootPins(), []);
  const totalSites = useMemo(
    () => roots.reduce((n, r) => n + countLeaves(r), 0),
    [roots]
  );
  const siteNo = useMemo(() => {
    const m = {};
    let i = 0;
    roots.forEach((g) => getChildren(g).forEach((s) => { m[s.id] = ++i; }));
    return m;
  }, [roots]);

  const currentItems = useMemo(
    () =>
      navStack.length === 0
        ? roots
        : getChildren(navStack[navStack.length - 1]),
    [navStack, roots]
  );

  const handleSelectItem = (item) => setSelectedItem(item);
  const handleDrillDown = (item) => {
    setNavStack((prev) => [...prev, item]);
    setSelectedItem(null);
  };
  const handleGoBack = () => {
    setNavStack((prev) => prev.slice(0, -1));
    setSelectedItem(null);
  };
  const handleClosePanel = () => setSelectedItem(null);

  return (
    <>
      <PageHeader
        eyebrow="The map room · 地图"
        title="Cultural Map"
        mark="岸"
        lead="George Town's older places sit along this shore — clan jetties, temples, merchant houses. Paramount is a little way up the coast. They are grouped here by the stretch of water they belong to."
        meta={[
          { k: "Sites", v: String(totalSites) },
          { k: "Stretches of coast", v: String(roots.length) },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          <ul className="map-legend" data-reveal>
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <li key={key}>
                <span className="map-legend__dot" style={{ background: cat.color }} />
                {cat.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="map-layout">
        <section className="cultural-map-section">
          <MapView
            items={currentItems}
            selectedItem={selectedItem}
            onSelectItem={handleSelectItem}
            navStack={navStack}
          />
          {navStack.length > 0 && <BackButton onClick={handleGoBack} />}
          {selectedItem && (
            <LocationPanel
              item={selectedItem}
              onClose={handleClosePanel}
              onNavigate={handleDrillDown}
            />
          )}
        </section>

        <nav className="site-index" aria-label="Site index">
          <p className="site-index__caption">Manifest — {totalSites} sites</p>
          {roots.map((group) => (
            <div className="site-index__group" key={group.id}>
              <button
                type="button"
                className="site-index__head"
                onClick={() => setSelectedItem(group)}
              >
                {group.name}
                {group.nameZh && <span className="site-index__zh"> · {group.nameZh}</span>}
              </button>
              <ul>
                {getChildren(group).map((site) => (
                  <li key={site.id}>
                    <button
                      type="button"
                      className={`site-index__site ${
                        selectedItem?.id === site.id ? "site-index__site--on" : ""
                      }`}
                      onClick={() => setSelectedItem(site)}
                    >
                      <span className="site-index__no">
                        {String(siteNo[site.id]).padStart(2, "0")}
                      </span>
                      <span
                        className="site-index__dot"
                        style={{ background: getPinColor(site) }}
                      />
                      <span className="site-index__name">
                        {site.name}
                        {isSuperPin(site) && (
                          <span className="site-index__more"> ›</span>
                        )}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}

export default CulturalMapMain;
