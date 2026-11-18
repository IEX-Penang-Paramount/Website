import fishingUnitPerimeterPresent from "./fishing-unit-perimeter-present-map.js";
import fishingUnitPresent from "./fishing-unit-present-map.js";
import fishingUnitPast from "./fishing-unit-past-map.js";
import shrines from "./shrines-map.js";
import oceanGreenRestaurantPresent from "./ocean-green-restaurant-present-map.js";
import oceanGreenRestaurantPast from "./ocean-green-restaurant-past-map.js";
import beachPast from "./beach-past-map.js";
const theCommunity = {
  id: "the-community",
  type: "pin",
  period: "",
  name: "The community",
  lat: 5.4266401,
  lng: 100.3263571,
  shortDescription: "The paramount fishing unit in Penang was formed as early as decades ago. It was established by people with common interests in fishing. The community members were from diverse backgrounds, with Chinese and Indian ethnicities being the most prominent. The fishing unit, while being small in size, has sustained fishing activities across at least two generations of fishermen, whether amateur or professional.",
  // The perimeter first: it is drawn under the pins that stand inside it.
  children: [
    fishingUnitPerimeterPresent,
    fishingUnitPresent,
    fishingUnitPast,
    shrines,
    oceanGreenRestaurantPresent,
    oceanGreenRestaurantPast,
    beachPast,
  ],
};

export default theCommunity;
