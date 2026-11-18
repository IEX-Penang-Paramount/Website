import pulauKendi from "./pulau-kendi-map.js";
import pulauRimauLighthouse from "./pulau-rimau-lighthouse-map.js";
import penangSecondBridge from "./penang-second-bridge-map.js";

const referencePoints = {
  id: "reference-points",
  type: "pin",
  period: "present",
  name: "Reference points for navigation",
  lat: 5.2535397,
  lng: 100.2547035,
  shortDescription:
    "Out at sea, the fishermen don’t rely on GPS to find their way. They " +
    "use landmarks such as Penang Bridge, the Pulau Rimau Lighthouse and " +
    "Pulau Kendi to orient themselves, and to tell each other where the " +
    "good hauls are.",
  children: [
    pulauKendi,
    pulauRimauLighthouse,
    penangSecondBridge,
  ],
};

export default referencePoints;
