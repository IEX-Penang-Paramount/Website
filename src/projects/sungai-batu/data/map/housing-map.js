import landedHousing from "./landed-housing-map.js";
import kampungHouses from "./kampung-houses-map.js";
import vanillaGardenFlats from "./vanilla-garden-flats-map.js";

const housing = {
  id: "housing",
  type: "pin",
  period: "present",
  name: "Housing",
  lat: 5.2825,
  lng: 100.2415,
  shortDescription:
    "Where the fishermen live, and how state development has moved them " +
    "over the years.",
  // Areas first, largest to smallest: later areas are drawn on top, so
  // smaller overlapping areas stay clickable.
  children: [
    landedHousing,
    kampungHouses,
    vanillaGardenFlats,
  ],
};

export default housing;
