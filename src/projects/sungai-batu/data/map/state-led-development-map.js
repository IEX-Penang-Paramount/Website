import housing from "./housing-map.js";
import plantations from "./plantations-map.js";
import mosque from "./mosque-map.js";

const stateLedDevelopment = {
  id: "state-led-development",
  type: "pin",
  period: "",
  name: "Past state-led development",
  lat: 5.2865,
  lng: 100.2455,
  shortDescription:
    "The PSI reclamation project is not the first time that the Sungai " +
    "Batu fishing community has been affected by state development " +
    "efforts. Housing, plantations and the mosque show how development " +
    "has otherwise affected the community over the years.",
  children: [
    housing,
    plantations,
    mosque,
  ],
};

export default stateLedDevelopment;
