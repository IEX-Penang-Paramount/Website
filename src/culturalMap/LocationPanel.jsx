import { CATEGORIES, isSuperPin, getPinColor } from "./data/index.js";
import "./LocationPanel.css";

function LocationPanel({ pin, onClose, onNavigate }) {
  const isSuper = isSuperPin(pin);
  const cat = isSuper ? null : CATEGORIES[pin.category];
  const color = getPinColor(pin);
  const badgeLabel = isSuper ? pin.name : cat?.label;

  return (
    <aside className="loc-panel">
      <button className="loc-panel__close" onClick={onClose} aria-label="Close">
        &times;
      </button>

      <span
        className="loc-panel__badge"
        style={{ background: color }}
      >
        {badgeLabel}
      </span>

      <h2 className="loc-panel__title">{pin.name}</h2>
      {pin.nameZh && (
        <p className="loc-panel__title-zh">{pin.nameZh}</p>
      )}

      <p className="loc-panel__desc">{pin.shortDescription}</p>

      {!isSuper && pin.address && (
        <dl className="loc-panel__meta">
          <dt>Address</dt>
          <dd>{pin.address}</dd>
        </dl>
      )}

      {isSuper && (
        <button
          className="loc-panel__navigate"
          onClick={() => onNavigate(pin)}
        >
          Explore locations &rarr;
        </button>
      )}
    </aside>
  );
}

export default LocationPanel;
