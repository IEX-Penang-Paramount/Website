import { CATEGORIES } from "./categories.js";

import psiReclamation from "./psi-reclamation-map.js";
import fishingJourney from "./fishing-journey-map.js";
import stateLedDevelopment from "./state-led-development-map.js";
import importantLocations from "./important-locations-map.js";
import udangRestaurants from "./udang-restaurants-map.js";

/* Cultural map of the Sungai Batu fishing community, from the project's
   Google My Maps ("Unit Nelayan Sungai Batu"). Its layers become the groups
   below. Lines on the source map (the example fishing route, the Zone A
   boundary, the Bayan Lepas – Teluk Kumbar flyover) are left out: the map
   draws pins and areas only. */
export default {
  center: [5.268, 100.25],
  zoom: 13,
  categories: CATEGORIES,
  // Top-level map objects only; each one builds its own children.
  roots: [
    psiReclamation,
    fishingJourney,
    stateLedDevelopment,
    importantLocations,
    udangRestaurants,
  ],
};
