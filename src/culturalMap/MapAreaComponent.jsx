import { Polygon, Tooltip } from "react-leaflet";
import "./MapAreaComponent.css";

const AREA_FILL_OPACITY = 0.15;
const AREA_FILL_OPACITY_ACTIVE = 0.35;
const AREA_STROKE_WEIGHT = 2;
const AREA_STROKE_WEIGHT_ACTIVE = 3;

const AREA_STROKE_WEIGHT_SUPER = 4;

function MapAreaComponent({ location, isLeaf = true, isSelected, onSelect }) {
  const color = location.getColor();
  const weight = isSelected
    ? AREA_STROKE_WEIGHT_ACTIVE
    : isLeaf
      ? AREA_STROKE_WEIGHT
      : AREA_STROKE_WEIGHT_SUPER;

  return (
    <Polygon
      positions={location.getCoordinates()}
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
        {location.getName()}
      </Tooltip>
    </Polygon>
  );
}

export default MapAreaComponent;
