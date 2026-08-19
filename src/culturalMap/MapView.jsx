import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { isSuperPin, isArea } from "./data/index.js";
import MapPin from "./MapPin.jsx";
import MapArea from "./MapArea.jsx";
import "leaflet/dist/leaflet.css";
import "./MapView.css";

const CENTER = [5.414, 100.339];
const DEFAULT_ZOOM = 15;

function FlyToHandler({ selectedPin, navStack }) {
  const map = useMap();
  const currentSuperPin = navStack[navStack.length - 1] || null;

  useEffect(() => {
    if (selectedPin) {
      map.flyTo([selectedPin.lat, selectedPin.lng], 17, { duration: 1.2 });
    } else if (currentSuperPin) {
      map.flyTo([currentSuperPin.lat, currentSuperPin.lng], 16, {
        duration: 1.0,
      });
    } else {
      map.flyTo(CENTER, DEFAULT_ZOOM, { duration: 1.0 });
    }
  }, [selectedPin, currentSuperPin, map]);

  return null;
}

function MapView({ pins, selectedPin, onSelectPin, navStack }) {
  return (
    <MapContainer
      center={CENTER}
      zoom={DEFAULT_ZOOM}
      className="cultural-map"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      {pins.map((pin, i) =>
        isArea(pin) ? (
          <MapArea
            key={pin.id}
            location={pin}
            isSelected={selectedPin?.id === pin.id}
            onSelect={onSelectPin}
          />
        ) : (
          <MapPin
            key={pin.id}
            location={pin}
            index={i}
            isLeaf={!isSuperPin(pin)}
            isSelected={selectedPin?.id === pin.id}
            onSelect={onSelectPin}
          />
        )
      )}

      <FlyToHandler selectedPin={selectedPin} navStack={navStack} />
    </MapContainer>
  );
}

export default MapView;
