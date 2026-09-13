import fishingUnitPerimeterPresent from "./fishing-unit-perimeter-present-map.js";
import fishingUnitPresent from "./fishing-unit-present-map.js";
import fishingUnitPast from "./fishing-unit-past-map.js";
import shrines from "./shrines-map.js";
import oceanGreenRestaurantPresent from "./ocean-green-restaurant-present-map.js";
import oceanGreenRestaurantPast from "./ocean-green-restaurant-past-map.js";

const theCommunity = {
  id: "the-community",
  type: "pin",
  period: "",
  name: "The community",
  lat: 5.4266401,
  lng: 100.3263571,
  shortDescription: "",
  // The perimeter first: it is drawn under the pins that stand inside it.
  children: [
    fishingUnitPerimeterPresent,
    fishingUnitPresent,
    fishingUnitPast,
    shrines,
    oceanGreenRestaurantPresent,
    oceanGreenRestaurantPast,
  ],
};

export default theCommunity;
