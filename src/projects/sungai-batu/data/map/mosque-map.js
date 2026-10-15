import mosqueOldSite from "./mosque-old-site-map.js";
import mosqueCurrentSite from "./mosque-current-site-map.js";

const mosque = {
  id: "mosque",
  type: "pin",
  period: "",
  name: "Mosque",
  lat: 5.286,
  lng: 100.2413,
  shortDescription: "The Sungai Batu mosque, then and now.",
  // Areas first, largest to smallest: later areas are drawn on top, so
  // smaller overlapping areas stay clickable.
  children: [
    mosqueOldSite,
    mosqueCurrentSite,
  ],
};

export default mosque;
