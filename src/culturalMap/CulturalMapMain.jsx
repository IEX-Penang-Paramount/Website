import { useState, useMemo } from "react";
import PageHeader from "../components/ui/PageHeader.jsx";
import {
  getRoots,
  getFilterOptions,
  matchesPeriod,
  ALL_PERIODS,
  CATEGORIES,
} from "./data/index.js";
import MapView from "./MapView.jsx";
import LocationPanel from "./LocationPanel.jsx";
import BackButton from "./BackButton.jsx";
import PeriodFilter from "./PeriodFilter.jsx";
import "./CulturalMapMain.css";

function countLeaves(item, period) {
  const kids = item.getChildren().filter((k) => matchesPeriod(k, period));
  if (kids.length === 0) return 1;
  return kids.reduce((n, k) => n + countLeaves(k, period), 0);
}

function CulturalMapMain() {
  const [navStack, setNavStack] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [period, setPeriod] = useState(ALL_PERIODS);

  const roots = useMemo(() => getRoots(), []);
  const filterOptions = useMemo(() => getFilterOptions(), []);

  // Filtering the roots array preserves the deliberate areas-largest-first order.
  const visibleRoots = useMemo(
    () => roots.filter((r) => matchesPeriod(r, period)),
    [roots, period]
  );

  const totalSites = useMemo(
    () => visibleRoots.reduce((n, r) => n + countLeaves(r, period), 0),
    [visibleRoots, period]
  );

  const siteNo = useMemo(() => {
    const m = {};
    let i = 0;
    visibleRoots.forEach((g) =>
      g
        .getChildren()
        .filter((s) => matchesPeriod(s, period))
        .forEach((s) => { m[s.getId()] = ++i; })
    );
    return m;
  }, [visibleRoots, period]);

  const currentItems = useMemo(
    () =>
      navStack.length === 0
        ? visibleRoots
        : navStack[navStack.length - 1]
            .getChildren()
            .filter((child) => matchesPeriod(child, period)),
    [navStack, visibleRoots, period]
  );

  // A selection the current period hides must not stay on screen: the panel
  // would describe an object with no marker, and FlyToHandler would park the
  // map over it. Derived, so it can never fall out of step with the period.
  const shownSelection =
    selectedItem && matchesPeriod(selectedItem, period) ? selectedItem : null;

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
  const handleSelectPeriod = (key) => {
    setPeriod(key);
    setSelectedItem(null); // the map flies home rather than staying on a hidden pin
    setNavStack([]); // a group open in one period may not exist in another
  };

  return (
    <>
      <PageHeader
        eyebrow="The map room · 地图"
        title="Cultural Map"
        mark="岸"
        lead="George Town's older places sit along this shore — clan jetties, temples, merchant houses. Paramount is a little way up the coast. They are grouped here by the stretch of water they belong to."
        meta={[
          { k: "Sites", v: String(totalSites) },
          { k: "Stretches of coast", v: String(visibleRoots.length) },
        ]}
      >
        <PeriodFilter
          options={filterOptions}
          value={period}
          onChange={handleSelectPeriod}
        />
      </PageHeader>

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
            selectedItem={shownSelection}
            onSelectItem={handleSelectItem}
            navStack={navStack}
          />
          {navStack.length > 0 && <BackButton onClick={handleGoBack} />}
          {shownSelection && (
            <LocationPanel
              item={shownSelection}
              onClose={handleClosePanel}
              onNavigate={handleDrillDown}
            />
          )}
        </section>

        <nav className="site-index" aria-label="Site index">
          <p className="site-index__caption" aria-live="polite">
            {totalSites > 0
              ? `Manifest — ${totalSites} sites`
              : "Manifest — nothing recorded for this period"}
          </p>
          {visibleRoots.map((group) => (
            <div className="site-index__group" key={group.getId()}>
              <button
                type="button"
                className="site-index__head"
                onClick={() => setSelectedItem(group)}
              >
                {group.getName()}
                {group.getNameZh() && <span className="site-index__zh"> · {group.getNameZh()}</span>}
              </button>
              <ul>
                {group
                  .getChildren()
                  .filter((site) => matchesPeriod(site, period))
                  .map((site) => (
                    <li key={site.getId()}>
                      <button
                        type="button"
                        className={`site-index__site ${
                          selectedItem?.getId() === site.getId() ? "site-index__site--on" : ""
                        }`}
                        onClick={() => setSelectedItem(site)}
                      >
                        <span className="site-index__no">
                          {String(siteNo[site.getId()]).padStart(2, "0")}
                        </span>
                        <span
                          className="site-index__dot"
                          style={{ background: site.getColor() }}
                        />
                        <span className="site-index__name">
                          {site.getName()}
                          {!site.isLeaf() && (
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
