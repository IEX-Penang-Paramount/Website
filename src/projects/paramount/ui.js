import ParamountLanding from "../../landing/ParamountLanding.jsx";

/* How Project Paramount presents itself. Content lives in ./data. */
export default {
  id: "paramount",
  pages: { landing: ParamountLanding },
  name: "Project Paramount",
  basePath: "/paramount",
  kicker: "Penang · oral history",
  summary:
    "Project Paramount documents the places, practices, and oral histories of a coastal fishing community.",

  glossary: {
    blurb: "Local terms for tide, weather and luck.",
    groupNoun: "kinds of knowing",
    header: {
      lead: "Not names for boats or gear. These are the words the men use for time, weather and chance — and the sense each one carries.",
    },
  },

  map: {
    blurb: "The shore against the coastline it belongs to.",
    groupNoun: "Stretches of coast",
    header: {
      lead: "George Town's older places sit along this shore — clan jetties, temples, merchant houses. Paramount is a little way up the coast. They are grouped here by the stretch of water they belong to.",
    },
  },

  stories: {
    blurb: "Recorded accounts, kept close to the telling.",
    recorded: "2025",
    header: {
      lead: "Accounts kept close to the way they were told. Each recording notes who spoke, when it was made, and which places and terms it touches.",
    },
  },
};
