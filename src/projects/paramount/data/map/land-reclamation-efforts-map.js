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
  shortDescription: "The land reclamations in Penang have allegedly affected the marine ecosystem drastically. Even though efforts have started in the past, the recent works have become more intensive and aggresive. The area of reclamation has signiifcantly expanded while the methods, especially the increase in the number of sand drilling operations, have become more destructive to the surronding marine environment.",
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
