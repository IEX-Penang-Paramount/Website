import { useMemo } from "react";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { getPinColor } from "./data/index.js";
import "./MapPin.css";

function MapPin({ location, index, isSelected, onSelect, isLeaf = true }) {
  const icon = useMemo(() => {
    const color = getPinColor(location);
    const sizeClass = isLeaf ? "" : "map-pin--super";
    const activeClass = isSelected ? "map-pin--active" : "";
    const size = isLeaf ? [20, 20] : [36, 36];
    const anchor = isLeaf ? [10, 10] : [18, 18];

    return L.divIcon({
      className: "",
      html: `<div class="map-pin ${sizeClass} ${activeClass}"
                  style="--pin-color: ${color};
                         --pin-delay: ${index * 80}ms">
             </div>`,
      iconSize: size,
      iconAnchor: anchor,
    });
  }, [location, index, isSelected, isLeaf]);

  return (
    <Marker
      position={[location.lat, location.lng]}
      icon={icon}
      eventHandlers={{ click: () => onSelect(location) }}
    >
      {isLeaf ? (
        <Tooltip direction="top" offset={[0, -12]}>
          {location.name}
        </Tooltip>
      ) : (
        <Tooltip direction="bottom" offset={[0, 14]} permanent>
          {location.name}
        </Tooltip>
      )}
    </Marker>
  );
}

export default MapPin;
