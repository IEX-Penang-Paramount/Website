import { Polygon, Tooltip } from "react-leaflet";
import { getPinColor } from "./data/index.js";
import "./MapArea.css";

const AREA_FILL_OPACITY = 0.15;
const AREA_FILL_OPACITY_ACTIVE = 0.35;
const AREA_STROKE_WEIGHT = 2;
const AREA_STROKE_WEIGHT_ACTIVE = 3;

const AREA_STROKE_WEIGHT_SUPER = 4;

function MapArea({ location, isLeaf = true, isSelected, onSelect }) {
  const color = getPinColor(location);
  const weight = isSelected
    ? AREA_STROKE_WEIGHT_ACTIVE
    : isLeaf
      ? AREA_STROKE_WEIGHT
      : AREA_STROKE_WEIGHT_SUPER;

  return (
    <Polygon
      positions={location.coordinates}
      pathOptions={{
        color,
        weight,
        fillColor: color,
        fillOpacity: isSelected ? AREA_FILL_OPACITY_ACTIVE : AREA_FILL_OPACITY,
        className: `map-area ${isSelected ? "map-area--active" : ""}`,
      }}
      eventHandlers={{ click: () => onSelect(location) }}
    >
      <Tooltip direction="center" permanent>
        {location.name}
      </Tooltip>
    </Polygon>
  );
}

export default MapArea;
