import { isSuperPin } from "./data/index.js";
import MapPin from "./MapPin.jsx";
import MapArea from "./MapArea.jsx";

const RENDERERS = {
  pin: MapPin,
  area: MapArea,
};

function MapObject({ location, index, isSelected, onSelect }) {
  const Renderer = RENDERERS[location.type] || RENDERERS.pin;
  const isLeaf = !isSuperPin(location);

  return (
    <Renderer
      location={location}
      index={index}
      isLeaf={isLeaf}
      isSelected={isSelected}
      onSelect={onSelect}
    />
  );
}

export default MapObject;
