import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/ui/PageHeader.jsx";
import { glossaryData } from "./glossaryData";
import "./Glossary.css";

/* The three kinds of knowing the glossary is organised by. Index + 1 matches
   the `type` field on each entry. */
const CATEGORIES = [
  { type: 1, label: "Time & natural order", zh: "时间与自然秩序", color: "#395a55" },
  { type: 2, label: "Emotions & dispositions", zh: "情绪与心性", color: "#a94f30" },
  { type: 3, label: "Knowledge of nature & the sea", zh: "对自然与海的认识", color: "#5c6540" },
];
const catOf = (t) => CATEGORIES.find((c) => c.type === t) || CATEGORIES[0];

/* Split "初一 (chue-it)" into the character and its romanisation. */
function splitName(name) {
  const m = name.trim().match(/^(.+?)\s*[（(]\s*([^）)]+)\s*[）)]\s*$/);
  return m ? { zh: m[1].trim(), roman: m[2].trim() } : { zh: name.trim(), roman: null };
}

const pad = (n) => String(n).padStart(2, "0");

function TermCard({ word, no, onOpen }) {
  const cat = catOf(word.type);
  const { zh, roman } = splitName(word.name);
  return (
    <button
      type="button"
      className="specimen"
      style={{ "--cat": cat.color }}
      onClick={() => onOpen(word)}
    >
      <span className="specimen__punch" aria-hidden="true" />
      <span className="specimen__tag">
        <span className="specimen__no">No. {pad(no)}</span>
        <span className="specimen__cat">
          <i className="specimen__swatch" /> {cat.label}
        </span>
      </span>
      <span className="specimen__word">
        <span className="specimen__zh">{zh}</span>
        {roman && <span className="specimen__roman">{roman}</span>}
      </span>
      <span className="specimen__gloss">{word.pDescription}</span>
      <span className="specimen__more" aria-hidden="true">Read the note →</span>
    </button>
  );
}

function GlossaryMain() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("all"); // "all" | 1 | 2 | 3
  const navigate = useNavigate();
  const openWord = (w) => navigate(`/glossary-detail/${w.id}`);
  const noOf = (w) => glossaryData.findIndex((x) => x.id === w.id) + 1;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return glossaryData.filter((w) => {
      const byType = activeType === "all" ? true : w.type === activeType;
      const byQuery =
        q.length === 0 ||
        w.name.toLowerCase().includes(q) ||
        w.pDescription.toLowerCase().includes(q);
      return byType && byQuery;
    });
  }, [search, activeType]);

  const grouped = activeType === "all" && search.trim() === "";

  return (
    <>
      <PageHeader
        eyebrow="The lexicon · 词汇"
        title="The Lexicon"
        mark="字"
        lead="Not names for boats or gear. These are the words the men use for time, weather and chance — and the sense each one carries."
        meta={[
          { k: "Terms", v: String(glossaryData.length) },
          { k: "Grouped as", v: "3 kinds of knowing" },
        ]}
      />

      <section className="section">
        <div className="container">
          <div className="glossary-controls" role="search">
            <input
              className="glossary-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a word or its meaning…"
              aria-label="Search glossary"
            />
            <div className="glossary-chips" role="group" aria-label="Filter by kind">
              <button
                type="button"
                className={`chip ${activeType === "all" ? "chip--on" : ""}`}
                onClick={() => setActiveType("all")}
              >
                All
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c.type}
                  type="button"
                  className={`chip ${activeType === c.type ? "chip--on" : ""}`}
                  style={{ "--cat": c.color }}
                  onClick={() => setActiveType(c.type)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="glossary-empty">No term matches that. Try another word.</p>
          ) : grouped ? (
            CATEGORIES.map((c, ci) => {
              const words = glossaryData.filter((w) => w.type === c.type);
              if (words.length === 0) return null;
              return (
                <div
                  className="glossary-group"
                  key={c.type}
                  data-reveal
                  style={{ "--reveal-delay": `${ci * 0.06}s` }}
                >
                  <div className="glossary-group__head" style={{ "--cat": c.color }}>
                    <span className="glossary-group__no">Group {pad(ci + 1)}</span>
                    <h2 className="glossary-group__title">{c.label}</h2>
                    <span className="glossary-group__zh">{c.zh}</span>
                    <span className="glossary-group__rule" />
                    <span className="glossary-group__count">{words.length}</span>
                  </div>
                  <div className="specimen-grid">
                    {words.map((w) => (
                      <TermCard key={w.id} word={w} no={noOf(w)} onOpen={openWord} />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="specimen-grid" data-reveal>
              {filtered.map((w) => (
                <TermCard key={w.id} word={w} no={noOf(w)} onOpen={openWord} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default GlossaryMain;
