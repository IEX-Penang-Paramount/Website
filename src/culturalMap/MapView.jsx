import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import MapObject from "./MapObject.jsx";
import "leaflet/dist/leaflet.css";
import "./MapView.css";

const CENTER = [5.414, 100.339];
const DEFAULT_ZOOM = 15;

function FlyToHandler({ selectedItem, navStack }) {
  const map = useMap();
  const currentParent = navStack[navStack.length - 1] || null;

  useEffect(() => {
    if (selectedItem) {
      map.flyTo([selectedItem.lat, selectedItem.lng], 17, { duration: 1.2 });
    } else if (currentParent) {
      map.flyTo([currentParent.lat, currentParent.lng], 16, {
        duration: 1.0,
      });
    } else {
      map.flyTo(CENTER, DEFAULT_ZOOM, { duration: 1.0 });
    }
  }, [selectedItem, currentParent, map]);

  return null;
}

function MapView({ items, selectedItem, onSelectItem, navStack }) {
  return (
    <MapContainer
      center={CENTER}
      zoom={DEFAULT_ZOOM}
      className="cultural-map"
      zoomControl={false}
    >
      {/* Esri "World Light Gray" — a clean, muted light base map, free, no key. */}
      <TileLayer
        attribution='Tiles &copy; Esri'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        maxZoom={16}
      />
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
        maxZoom={16}
      />

      {items.map((item, i) => (
        <MapObject
          key={item.id}
          location={item}
          index={i}
          isSelected={selectedItem?.id === item.id}
          onSelect={onSelectItem}
        />
      ))}

      <FlyToHandler selectedItem={selectedItem} navStack={navStack} />
    </MapContainer>
  );
}

export default MapView;
