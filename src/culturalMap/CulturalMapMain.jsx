import { useState, useMemo } from "react";
import PageHeader from "../components/ui/PageHeader.jsx";
import { getNavItem } from "../config/navigation.js";
import { getRootPins, getChildren } from "./data/index.js";
import MapView from "./MapView.jsx";
import LocationPanel from "./LocationPanel.jsx";
import BackButton from "./BackButton.jsx";
import "./CulturalMapMain.css";

const NAV = getNavItem("/cultural-map");

function CulturalMapMain() {
  const [navStack, setNavStack] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const currentItems = useMemo(
    () =>
      navStack.length === 0
        ? getRootPins()
        : getChildren(navStack[navStack.length - 1]),
    [navStack]
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
      <PageHeader title={NAV.label} subtitle={NAV.description} />

      <section className="section">
        <div className="container">
          <p className="prose">
            Each location carries a short account of what happens there and how
            its use has shifted over time. Sites are grouped by the stretch of
            coast they sit on, so a walk along the shore reads as a sequence
            rather than a scatter of points.
          </p>
        </div>
      </section>

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
    </>
  );
}

export default CulturalMapMain;
