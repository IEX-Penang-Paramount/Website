import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlossaryMain from "./glossary/GlossaryMain.jsx";
import CulturalMapMain from "./culturalMap/CulturalMapMain.jsx";
import StoriesMain from "./stories/StoriesMain.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/glossary" element={<GlossaryMain />} />
        <Route path="/cultural-map" element={<CulturalMapMain />} />
        <Route path="/story" element={<StoriesMain />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
