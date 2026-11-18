import fishingSpot1 from "./fishing-spot-1-map.js";
import fishingSpot2 from "./fishing-spot-2-map.js";
import fishingSpot3 from "./fishing-spot-3-map.js";
import fishingSpot4 from "./fishing-spot-4-map.js";
import fishingSpot5 from "./fishing-spot-5-map.js";
import fishingSpot6 from "./fishing-spot-6-map.js";
import fishingSpot7 from "./fishing-spot-7-map.js";
import fishingSpot8 from "./fishing-spot-8-map.js";
import fishingSpot9 from "./fishing-spot-9-map.js";
import fishingSpot10 from "./fishing-spot-10-map.js";

const fishingSpots = {
  id: "fishing-spots",
  type: "pin",
  period: "present",
  name: "Fishing spots",
  lat: 5.2425,
  lng: 100.265,
  shortDescription:
    "Some of the fishing spots that we went out to with the fishermen: " +
    "dark green marks the spots from January 2024, light green those from " +
    "August 2024. The furthest spot is 7 km out from shore. Good fishing " +
    "spots vary from day to day, and the fishermen share them by shouting " +
    "and using hand signals.",
  children: [
    fishingSpot1,
    fishingSpot2,
    fishingSpot3,
    fishingSpot4,
    fishingSpot5,
    fishingSpot6,
    fishingSpot7,
    fishingSpot8,
    fishingSpot9,
    fishingSpot10,
  ],
};

export default fishingSpots;
