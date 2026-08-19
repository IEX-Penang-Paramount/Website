import { CATEGORIES, isSuperPin, getPinColor } from "./data/index.js";
import "./LocationPanel.css";

function LocationPanel({ item, onClose, onNavigate }) {
  const isSuper = isSuperPin(item);
  const cat = isSuper ? null : CATEGORIES[item.category];
  const color = getPinColor(item);
  const badgeLabel = isSuper ? item.name : cat?.label;

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

      <h2 className="loc-panel__title">{item.name}</h2>
      {item.nameZh && (
        <p className="loc-panel__title-zh">{item.nameZh}</p>
      )}

      <p className="loc-panel__desc">{item.shortDescription}</p>

      {!isSuper && item.address && (
        <dl className="loc-panel__meta">
          <dt>Address</dt>
          <dd>{item.address}</dd>
        </dl>
      )}

      {isSuper && (
        <button
          className="loc-panel__navigate"
          onClick={() => onNavigate(item)}
        >
          Explore locations &rarr;
        </button>
      )}
    </aside>
  );
}

export default LocationPanel;
