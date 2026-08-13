import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Global styles, loaded before any component so tokens resolve everywhere.
import "./styles/tokens.css";
import "./index.css";
import "./styles/layout.css";

import Layout from "./components/layout/Layout.jsx";
import App from "./App.jsx";
import GlossaryMain from "./glossary/GlossaryMain.jsx";
import CulturalMapMain from "./culturalMap/CulturalMapMain.jsx";
import StoriesMain from "./stories/StoriesMain.jsx";
import GlossaryDisplayPage from './glossary/GlossaryDisplayPage.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/glossary" element={<GlossaryMain />} />
          <Route path="/cultural-map" element={<CulturalMapMain />} />
          <Route path="/story" element={<StoriesMain />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
