import reclaimedAreaStp2 from "./reclaimed-area-stp2-map.js";
import reclaimedAreaStp1 from "./reclaimed-area-stp1-map.js";
import reclaimedAreaGurneyPark from "./reclaimed-area-gurney-park-map.js";
import sandDriller from "./sand-driller-map.js";
import futureSandDrillingPoint from "./future-sand-drilling-point-map.js";

const landReclamationEfforts = {
  id: "land-reclamation-efforts",
  type: "pin",
  period: "",
  name: "Land reclamation efforts",
  // The centre of the reclamation works. The future sand-drilling point sits
  // some way south of the rest, so it is left out of this centre.
  lat: 5.4459359,
  lng: 100.3209743,
  shortDescription: "",
  // Areas first, largest to smallest: later areas are drawn on top, so
  // smaller overlapping areas stay clickable.
  children: [
    reclaimedAreaStp2,
    reclaimedAreaStp1,
    reclaimedAreaGurneyPark,
    sandDriller,
    futureSandDrillingPoint,
  ],
};

export default landReclamationEfforts;
