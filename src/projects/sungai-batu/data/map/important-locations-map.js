import pantaiTelukBayu from "./pantai-teluk-bayu-map.js";
import skSungaiBatu from "./sk-sungai-batu-map.js";
import masjidRidwaniahSungaiBatu from "./masjid-ridwaniah-sungai-batu-map.js";
import cendolRahani from "./cendol-rahani-map.js";
import kampungTelukKumbar from "./kampung-teluk-kumbar-map.js";
import hotelPenMutiara from "./hotel-pen-mutiara-map.js";
import kampungTelukTempoyakKecil from "./kampung-teluk-tempoyak-kecil-map.js";

const importantLocations = {
  id: "important-locations",
  type: "pin",
  period: "present",
  name: "Important locations",
  lat: 5.284,
  lng: 100.255,
  shortDescription: "The fishermen’s way of life and the locations of importance to them.",
  children: [
    pantaiTelukBayu,
    skSungaiBatu,
    masjidRidwaniahSungaiBatu,
    cendolRahani,
    kampungTelukKumbar,
    hotelPenMutiara,
    kampungTelukTempoyakKecil,
  ],
};

export default importantLocations;
