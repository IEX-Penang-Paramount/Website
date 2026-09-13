import { createMapObject } from "./MapObject.js";
import { PERIODS, ALL_PERIODS, comparePeriods } from "./periods.js";

import fishingAreaPast from "./fishing-area-past-map.js";
import fishingAreaPresent from "./fishing-area-present-map.js";
import fishingArea2 from "./fishing-area-2-map.js";
import reclaimedAreaStp2 from "./reclaimed-area-stp2-map.js";
import reclaimedAreaStp1 from "./reclaimed-area-stp1-map.js";
import reclaimedAreaGurneyPark from "./reclaimed-area-gurney-park-map.js";
import fishingUnitPerimeterPresent from "./fishing-unit-perimeter-present-map.js";
import fishingUnitPresent from "./fishing-unit-present-map.js";
import firstPenangBridge from "./first-penang-bridge-map.js";
import secondPenangBridge from "./second-penang-bridge-map.js";
import fishCatchPoint1 from "./fish-catch-point-1-map.js";
import fishCatchPoint2 from "./fish-catch-point-2-map.js";
import northernStreetPresent from "./northern-street-present-map.js";
import sandDriller from "./sand-driller-map.js";
import oceanGreenRestaurantPresent from "./ocean-green-restaurant-present-map.js";
import eoHotel from "./eo-hotel-map.js";
import futureSandDrillingPoint from "./future-sand-drilling-point-map.js";
import shrines from "./shrines-map.js";
import northernStreetPast from "./northern-street-past-map.js";
import oceanGreenRestaurantPast from "./ocean-green-restaurant-past-map.js";
import fishingUnitPast from "./fishing-unit-past-map.js";
import beachPast from "./beach-past-map.js";
import fishMarketsAndRestaurants from "./fish-markets-and-restaurants-map.js";
import bungalowHouses from "./bungalow-houses-map.js";

export { CATEGORIES } from "./categories.js";
export { ALL_PERIODS, matchesPeriod } from "./periods.js";

// Top-level map objects only; each one builds its own children.
// Areas first, largest to smallest: later areas are drawn on top, so
// smaller overlapping areas stay clickable.
const ROOTS = Object.freeze(
  [
    fishingAreaPast,
    fishingAreaPresent,
    fishingArea2,
    reclaimedAreaStp2,
    reclaimedAreaStp1,
    reclaimedAreaGurneyPark,
    fishingUnitPerimeterPresent,

    fishingUnitPresent,
    firstPenangBridge,
    secondPenangBridge,
    fishCatchPoint1,
    fishCatchPoint2,
    northernStreetPresent,
    sandDriller,
    oceanGreenRestaurantPresent,
    eoHotel,
    futureSandDrillingPoint,
    shrines,
    northernStreetPast,
    oceanGreenRestaurantPast,
    fishingUnitPast,
    beachPast,
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
