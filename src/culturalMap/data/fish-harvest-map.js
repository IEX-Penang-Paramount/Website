import fishingAreaPast from "./fishing-area-past-map.js";
import fishingAreaPresent from "./fishing-area-present-map.js";
import fishingArea2 from "./fishing-area-2-map.js";
import fishCatchPoint1 from "./fish-catch-point-1-map.js";
import fishCatchPoint2 from "./fish-catch-point-2-map.js";

const fishHarvest = {
  id: "fish-harvest",
  type: "pin",
  period: "",
  name: "Fish harvest",
  lat: 5.44148,
  lng: 100.3410953,
  shortDescription: "The fish harvest during the past and the present, according to the fishing unit, has changed and declined over time. It is a significant indicator of the health of the marine ecosystem and the community's livelihood.",
  // Areas first, largest to smallest: later areas are drawn on top, so
  // smaller overlapping areas stay clickable.
  children: [
    fishingAreaPast,
    fishingAreaPresent,
    fishingArea2,
    fishCatchPoint1,
    fishCatchPoint2,
  ],
};

export default fishHarvest;
