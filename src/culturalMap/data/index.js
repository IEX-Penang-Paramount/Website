import root from "./_root-map.js";
import heritageCore from "./heritage-core-map.js";
import waterfrontBelt from "./waterfront-belt-map.js";

import fishingAreaPresent from "./fishing-area-present-map.js";
import fishingUnitPresent from "./fishing-unit-present-map.js";
import firstPenangBridge from "./first-penang-bridge-map.js";
import secondPenangBridge from "./second-penang-bridge-map.js";
import reclaimedAreaStp2 from "./reclaimed-area-stp2-map.js";
import fishCatchPoint1 from "./fish-catch-point-1-map.js";
import fishCatchPoint2 from "./fish-catch-point-2-map.js";
import northernStreetPresent from "./northern-street-present-map.js";
import sandDriller from "./sand-driller-map.js";
import oceanGreenRestaurantPresent from "./ocean-green-restaurant-present-map.js";
import eoHotel from "./eo-hotel-map.js";
import futureSandDrillingPoint from "./future-sand-drilling-point-map.js";
import fishingArea2 from "./fishing-area-2-map.js";
import fishingUnitPerimeterPresent from "./fishing-unit-perimeter-present-map.js";
import shrines from "./shrines-map.js";
import reclaimedAreaGurneyPark from "./reclaimed-area-gurney-park-map.js";
import reclaimedAreaStp1 from "./reclaimed-area-stp1-map.js";
import northernStreetPast from "./northern-street-past-map.js";
import oceanGreenRestaurantPast from "./ocean-green-restaurant-past-map.js";
import fishingAreaPast from "./fishing-area-past-map.js";
import fishingUnitPast from "./fishing-unit-past-map.js";
import beachPast from "./beach-past-map.js";
import fishMarketsAndRestaurants from "./fish-markets-and-restaurants-map.js";
import bungalowHouses from "./bungalow-houses-map.js";

export const CATEGORIES = {
  "clan-house": { label: "Clan House", color: "#a94f30" },
  mansion: { label: "Heritage Mansion", color: "#395a55" },
  "street-art": { label: "Street Art & Culture", color: "#1c2926" },
  waterfront: { label: "Waterfront & Jetties", color: "#8a6a41" },
  religious: { label: "Temple & Mosque", color: "#6a5f7e" },
};

const ALL_PINS = [
  root,
  heritageCore,
  waterfrontBelt,

  fishingAreaPresent,
  fishingUnitPresent,
  firstPenangBridge,
  secondPenangBridge,
  reclaimedAreaStp2,
  fishCatchPoint1,
  fishCatchPoint2,
  northernStreetPresent,
  sandDriller,
  oceanGreenRestaurantPresent,
  eoHotel,
  futureSandDrillingPoint,
  fishingArea2,
  fishingUnitPerimeterPresent,
  shrines,
  reclaimedAreaGurneyPark,
  reclaimedAreaStp1,
  northernStreetPast,
  oceanGreenRestaurantPast,
  fishingAreaPast,
  fishingUnitPast,
  beachPast,
  fishMarketsAndRestaurants,
  bungalowHouses,
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
