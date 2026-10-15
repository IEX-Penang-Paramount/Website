import SungaiBatuLanding from "../../landing/SungaiBatuLanding.jsx";

/* How Project Nelayan Sungai Batu presents itself. Content lives in ./data.
   Copy is drawn from the project's original site. */
export default {
  id: "sungai-batu",
  pages: { landing: SungaiBatuLanding },
  name: "Project Nelayan Sungai Batu",
  basePath: "/sungai-batu",
  kicker: "Southern Penang · fishing practices",
  summary:
    "Documenting the fishing practices of the Sungai Batu fishing community amidst the Penang South Islands reclamation.",

  glossary: {
    blurb: "The fishermen's words for their catch, trade, community and values.",
    groupNoun: "themes",
    header: {
      lead: "Terms the Sungai Batu fishermen use, grouped by four themes — fishing, commerce, society and values — each with the Malay word first.",
    },
  },

  map: {
    blurb: "The fishing journey, the reclamation, and the places that matter.",
    groupNoun: "Layers",
    header: {
      lead: "The fishermen's journey out to sea, the Penang South Islands reclamation and how it affects them, the state development that came before it, and the places of importance to the community.",
    },
  },

  stories: {
    blurb: "Articles and a documentary on the fishing community.",
    recorded: "2024",
    header: {
      lead: "Two articles on how the fishermen fish and trade, and a documentary following two of them after the reclamation began.",
    },
  },
};
