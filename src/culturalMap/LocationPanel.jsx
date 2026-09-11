import { CATEGORIES } from "./data/index.js";
import "./LocationPanel.css";

function LocationPanel({ item, onClose, onNavigate }) {
  const isSuper = !item.isLeaf();
  const cat = isSuper ? null : CATEGORIES[item.getCategory()];
  const color = item.getColor();
  const badgeLabel = isSuper ? item.getName() : cat?.label;

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

      <h2 className="loc-panel__title">{item.getName()}</h2>
      {item.getNameZh() && (
        <p className="loc-panel__title-zh">{item.getNameZh()}</p>
      )}

      <p className="loc-panel__desc">{item.getShortDescription()}</p>

      {!isSuper && item.getAddress() && (
        <dl className="loc-panel__meta">
          <dt>Address</dt>
          <dd>{item.getAddress()}</dd>
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
