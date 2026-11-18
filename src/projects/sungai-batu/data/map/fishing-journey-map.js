import fishingArea from "./fishing-area-map.js";
import settingOff from "./setting-off-map.js";
import unitNelayanSungaiBatu from "./unit-nelayan-sungai-batu-map.js";
import pasarNelayan from "./pasar-nelayan-map.js";
import referencePoints from "./reference-points-map.js";
import fishingSpots from "./fishing-spots-map.js";

const fishingJourney = {
  id: "fishing-journey",
  type: "pin",
  period: "present",
  name: "The fishing journey",
  lat: 5.26,
  lng: 100.256,
  shortDescription:
    "The journey of the Sungai Batu fishermen out at sea: where they set " +
    "off, the fishing area and spots they work, the reference points they " +
    "navigate by, and the market where their catch is sold.",
  // The fishing area first: it is drawn under the pins that stand inside it.
  children: [
    fishingArea,
    settingOff,
    unitNelayanSungaiBatu,
    pasarNelayan,
    referencePoints,
    fishingSpots,
  ],
};

export default fishingJourney;
