import MapPinComponent from "./MapPinComponent.jsx";
import MapAreaComponent from "./MapAreaComponent.jsx";

const RENDERERS = {
  pin: MapPinComponent,
  area: MapAreaComponent,
};

function MapObjectComponent({ location, index, isSelected, onSelect }) {
  const Renderer = RENDERERS[location.getType()];
  const isLeaf = location.isLeaf();

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

export default MapObjectComponent;
