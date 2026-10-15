import islandA from "./island-a-map.js";
import islandB from "./island-b-map.js";
import islandC from "./island-c-map.js";
import reclamationProgressAug2024 from "./reclamation-progress-aug-2024-map.js";
import reclamationProgressJan2024 from "./reclamation-progress-jan-2024-map.js";
import ppsnPermatangDamarLaut from "./ppsn-permatang-damar-laut-map.js";
import viewingAreaPermatangDamarLaut from "./viewing-area-permatang-damar-laut-map.js";

const psiReclamation = {
  id: "psi-reclamation",
  type: "pin",
  period: "present",
  name: "Penang South Islands reclamation",
  lat: 5.259,
  lng: 100.24,
  shortDescription:
    "The Penang South Islands (PSI) reclamation project and how it " +
    "affects the fishermen: the islands first proposed, the one now being " +
    "reclaimed, and how far the works had spread by January and August " +
    "2024.",
  // Areas first, largest to smallest: later areas are drawn on top, so
  // smaller overlapping areas stay clickable.
  children: [
    islandA,
    islandB,
    islandC,
    reclamationProgressAug2024,
    reclamationProgressJan2024,
    ppsnPermatangDamarLaut,
    viewingAreaPermatangDamarLaut,
  ],
};

export default psiReclamation;
