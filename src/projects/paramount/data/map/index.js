import { CATEGORIES } from "./categories.js";

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

export default {
  center: [5.414, 100.339],
  zoom: 15,
  categories: CATEGORIES,
  // Top-level map objects only; each one builds its own children.
  // Areas before pins, largest area first: later areas are drawn on top, so
  // smaller overlapping areas stay clickable.
  roots: [
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
  ],
};
