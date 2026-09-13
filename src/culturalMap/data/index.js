import { createMapObject } from "./MapObject.js";
import { PERIODS, ALL_PERIODS, comparePeriods } from "./periods.js";

import fishHarvest from "./fish-harvest-map.js";
import landReclamationEfforts from "./land-reclamation-efforts-map.js";
import theCommunity from "./the-community-map.js";

import firstPenangBridge from "./first-penang-bridge-map.js";
import secondPenangBridge from "./second-penang-bridge-map.js";
import northernStreetPresent from "./northern-street-present-map.js";
import eoHotel from "./eo-hotel-map.js";
import northernStreetPast from "./northern-street-past-map.js";
import fishMarketsAndRestaurants from "./fish-markets-and-restaurants-map.js";
import bungalowHouses from "./bungalow-houses-map.js";

export { CATEGORIES } from "./categories.js";
export { ALL_PERIODS, matchesPeriod } from "./periods.js";

// Top-level map objects only; each one builds its own children.
// Areas before pins, largest area first: later areas are drawn on top, so
// smaller overlapping areas stay clickable.
const ROOTS = Object.freeze(
  [
    fishHarvest,
    landReclamationEfforts,
    theCommunity,
    firstPenangBridge,
    secondPenangBridge,
    northernStreetPresent,
    eoHotel,
    northernStreetPast,
    fishMarketsAndRestaurants,
    bungalowHouses,
  ].map(createMapObject)
);

export function getRoots() {
  return ROOTS;
}

function collectPeriods(items, found = new Set()) {
  items.forEach((item) => {
    if (item.getPeriod()) found.add(item.getPeriod());
    collectPeriods(item.getChildren(), found);
  });
  return found;
}

// Every period present in the data, never a hardcoded pair. Computed once:
// the tree is frozen and cannot change at runtime. The buttons uppercase their
// text, so a period with no entry in PERIODS reads fine under its own key.
const FILTER_OPTIONS = Object.freeze([
  Object.freeze({ key: ALL_PERIODS, label: "All" }),
  ...[...collectPeriods(ROOTS)]
    .sort(comparePeriods)
    .map((key) => Object.freeze({ key, label: PERIODS[key]?.label ?? key })),
]);

export function getFilterOptions() {
  return FILTER_OPTIONS;
}
