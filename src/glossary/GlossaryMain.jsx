import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/ui/PageHeader.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import { useProject } from "../projects/ProjectContext.js";
import "./Glossary.css";

/* Split "初一 (chue-it)" into the character and its romanisation. */
function splitName(name) {
  const m = name.trim().match(/^(.+?)\s*[（(]\s*([^）)]+)\s*[）)]\s*$/);
  return m ? { zh: m[1].trim(), roman: m[2].trim() } : { zh: name.trim(), roman: null };
}

const pad = (n) => String(n).padStart(2, "0");

function TermCard({ word, cat, no, onOpen }) {
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
  const project = useProject();
  const glossary = project.getSection("glossary");
  const entries = glossary.getItems();
  const categories = glossary.getCategories();

  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("all"); // "all" | a category type
  const navigate = useNavigate();
  const openWord = (w) => navigate(project.pathTo(glossary.getPath(), w.id));

  const q = search.trim().toLowerCase();
  const filtered = entries.filter((w) => {
    const byType = activeType === "all" ? true : w.type === activeType;
    const byQuery =
      q.length === 0 ||
      w.name.toLowerCase().includes(q) ||
      w.pDescription.toLowerCase().includes(q);
    return byType && byQuery;
  });

  const grouped = categories.length > 0 && activeType === "all" && search.trim() === "";
  const card = (w) => (
    <TermCard
      key={w.id}
      word={w}
      cat={glossary.categoryOf(w.type)}
      no={glossary.numberOf(w)}
      onOpen={openWord}
    />
  );

  const meta = [{ k: "Terms", v: String(entries.length) }];
  if (categories.length > 0) {
    meta.push({
      k: "Grouped as",
      v: `${categories.length} ${glossary.getUi("groupNoun") ?? "groups"}`,
    });
  }

  return (
    <>
      <PageHeader
        eyebrow="The lexicon · 词汇"
        title="The Lexicon"
        mark="字"
        {...glossary.getHeader()}
        meta={meta}
      />

      <section className="section">
        <div className="container">
          {glossary.isEmpty() ? (
            <EmptyState message="No terms recorded yet." />
          ) : (
            <>
              <div className="glossary-controls" role="search">
                <input
                  className="glossary-search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search a word or its meaning…"
                  aria-label="Search glossary"
                />
                {categories.length > 0 && (
                  <div className="glossary-chips" role="group" aria-label="Filter by kind">
                    <button
                      type="button"
                      className={`chip ${activeType === "all" ? "chip--on" : ""}`}
                      onClick={() => setActiveType("all")}
                    >
                      All
                    </button>
                    {categories.map((c) => (
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
                )}
              </div>

              {filtered.length === 0 ? (
                <p className="glossary-empty">No term matches that. Try another word.</p>
              ) : grouped ? (
                categories.map((c, ci) => {
                  const words = entries.filter((w) => w.type === c.type);
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
                      <div className="specimen-grid">{words.map(card)}</div>
                    </div>
                  );
                })
              ) : (
                <div className="specimen-grid" data-reveal>
                  {filtered.map(card)}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default GlossaryMain;
