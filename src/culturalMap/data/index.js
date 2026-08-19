import root from "./_root-map.js";
import heritageCore from "./heritage-core-map.js";
import waterfrontBelt from "./waterfront-belt-map.js";
import khooKongsi from "./khoo-kongsi-map.js";
import armenianStreet from "./armenian-street-map.js";
import kapitanKeling from "./kapitan-keling-map.js";
import cheongFattTze from "./cheong-fatt-tze-map.js";
import chewJetty from "./chew-jetty-map.js";

export const CATEGORIES = {
  "clan-house": { label: "Clan House", color: "var(--color-terracotta)" },
  mansion: { label: "Heritage Mansion", color: "var(--color-teal)" },
  "street-art": { label: "Street Art & Culture", color: "var(--color-navy)" },
  waterfront: { label: "Waterfront & Jetties", color: "#b07a3a" },
  religious: { label: "Temple & Mosque", color: "#7a5c3a" },
};

const ALL_PINS = [
  root,
  heritageCore,
  waterfrontBelt,
  khooKongsi,
  armenianStreet,
  kapitanKeling,
  cheongFattTze,
  chewJetty,
];

const PIN_REGISTRY = new Map(ALL_PINS.map((p) => [p.id, p]));

export function getPin(id) {
  return PIN_REGISTRY.get(id);
}

export function getChildren(pin) {
  return (pin.children || []).map((id) => PIN_REGISTRY.get(id));
}

export function getRootPins() {
  return getChildren(PIN_REGISTRY.get("_root"));
}

export function isSuperPin(pin) {
  return Array.isArray(pin.children) && pin.children.length > 0;
}

export function isArea(pin) {
  return pin.type === "area";
}

export const DEFAULT_PIN_COLOR = "#3b82f6";
export const DEFAULT_AREA_COLOR = "#3b82f6";

export function getPinColor(pin) {
  const fallback = isArea(pin) ? DEFAULT_AREA_COLOR : DEFAULT_PIN_COLOR;
  if (pin.color) return pin.color;
  if (pin.category && CATEGORIES[pin.category]) return CATEGORIES[pin.category].color;
  return fallback;
}
