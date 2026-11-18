import durianPlantations from "./durian-plantations-map.js";
import rubberPlantations from "./rubber-plantations-map.js";
import dzoneCondominium from "./dzone-condominium-map.js";
import emeraldResidenceCondominium from "./emerald-residence-condominium-map.js";
import bukitPayung from "./bukit-payung-map.js";

const plantations = {
  id: "plantations",
  type: "pin",
  period: "",
  name: "Plantations",
  lat: 5.2895,
  lng: 100.249,
  shortDescription:
    "The durian and rubber plantations that once stood here, and what " +
    "replaced them.",
  // Areas first, largest to smallest: later areas are drawn on top, so
  // smaller overlapping areas stay clickable.
  children: [
    durianPlantations,
    rubberPlantations,
    dzoneCondominium,
    emeraldResidenceCondominium,
    bukitPayung,
  ],
};

export default plantations;
