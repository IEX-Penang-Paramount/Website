import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Global styles, loaded before any component so tokens resolve everywhere.
import "./styles/tokens.css";
import "./index.css";
import "./styles/layout.css";

import { PROJECTS } from "./projects/index.js";
import Layout from "./components/layout/Layout.jsx";
import LegacyRedirect from "./components/routing/LegacyRedirect.jsx";
import App from "./App.jsx";
import MasterLanding from "./landing/MasterLanding.jsx";
import ProjectLanding from "./landing/ProjectLanding.jsx";
import GlossaryMain from "./glossary/GlossaryMain.jsx";
import GlossaryDisplayPage from "./glossary/GlossaryDisplayPage.jsx";
import CulturalMapMain from "./culturalMap/CulturalMapMain.jsx";
import StoriesMain from "./stories/StoriesMain.jsx";
import ArticleDisplay from "./stories/ArticleDisplay.jsx";

// Every project gets these routes; a project's ui.js `pages` can replace any.
const PAGES = [
  { key: "landing", index: true, Page: ProjectLanding },
  { key: "glossary", path: "glossary", Page: GlossaryMain },
  { key: "glossaryDetail", path: "glossary/:id", Page: GlossaryDisplayPage },
  { key: "map", path: "cultural-map", Page: CulturalMapMain },
  { key: "stories", path: "story", Page: StoriesMain },
  { key: "story", path: "story/:articleID", Page: ArticleDisplay },
];

// Where the pages lived before projects had their own prefix.
const LEGACY = {
  "/glossary": "/paramount/glossary",
  "/glossary-detail/:id": "/paramount/glossary/:id",
  "/cultural-map": "/paramount/cultural-map",
  "/story": "/paramount/story",
  "/story/:articleID": "/paramount/story/:articleID",
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/Website">
      <Routes>
        <Route path="/" element={<MasterLanding />} />
        {/* Paramount keeps its immersive opening outside the shared page chrome. */}
        <Route path="/paramount" element={<App />} />
        <Route path="/projects" element={<Navigate to="/" replace />} />

        {PROJECTS.map((project) => (
          <Route
            key={project.getId()}
            path={project.getBasePath()}
            element={<Layout project={project} />}
          >
            {PAGES.filter(({ key }) => !(project.getId() === "paramount" && key === "landing")).map(({ key, index, path, Page }) => {
              const Element = project.getPage(key) ?? Page;
              return <Route key={key} index={index} path={path} element={<Element />} />;
            })}
          </Route>
        ))}

        {Object.entries(LEGACY).map(([from, to]) => (
          <Route key={from} path={from} element={<LegacyRedirect to={to} />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
