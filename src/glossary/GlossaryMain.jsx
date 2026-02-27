import React, { useMemo, useState } from "react";
import { TopBar } from "../Reusables/TopComponents/TopBar";
import { GlossaryPreview } from "./GlossaryPreview";
import "./Glossary.css";

function GlossaryMain() {
  // Mock data (replace with your real data source later)
  const glossaryData = useMemo(
    () => [
      {
        id: "w1",
        name: "顺其自然",
        pDescription: "Let nature take its course; accept uncertainty in fishing.",
        type: "a",
      },
      {
        id: "w2",
        name: "涨潮",
        pDescription: "High tide; water level rises and currents may change.",
        type: "b",
      },
      {
        id: "w3",
        name: "退潮",
        pDescription: "Low tide; water level falls, affecting fishing timing.",
        type: "b",
      },
      {
        id: "w4",
        name: "海风",
        pDescription: "Sea breeze; often linked to comfort and fishing rhythm.",
        type: "c",
      },
      {
        id: "w5",
        name: "运气",
        pDescription: "Luck; fishermen sometimes describe catch as dependent on luck.",
        type: "a",
      },
    ],
    []
  );

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all"); // all | a | b | c
  const [currentWord, setCurrentWord] = useState(null);

  function GlossaryHeader() {
       return  (<header className="glossaryHeader">
                <div className="glossaryTitleBlock">
                  <h1 className="glossaryTitle">Glossary</h1>
                  <p className="glossarySubtitle">
                    Browse terms like a dictionary. Search and filter by type.
                  </p>
                </div>

                <div className="glossaryControls" role="search">
                  <label className="controlLabel">
                    <span className="controlText">Search</span>
                    <input
                      className="searchInput"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search by word or description…"
                      aria-label="Search glossary"
                    />
                  </label>

                  <label className="controlLabel">
                    <span className="controlText">Type</span>
                    <select
                      className="typeSelect"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      aria-label="Filter glossary by type"
                    >
                      <option value="all">All</option>
                      <option value="a">a</option>
                      <option value="b">b</option>
                      <option value="c">c</option>
                    </select>
                  </label>
                </div>
              </header>);
}

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return glossaryData.filter((w) => {
      const matchesType = typeFilter === "all" ? true : w.type === typeFilter;
      const matchesQuery =
        q.length === 0
          ? true
          : w.name.toLowerCase().includes(q) || w.pDescription.toLowerCase().includes(q);

      return matchesType && matchesQuery;
    });
  }, [glossaryData, search, typeFilter]);

  return (
    <div className="glossaryPage">
      <TopBar />
      <main className="glossaryMain">
        <section className="gridWrap" aria-label="Glossary preview list">
        
        <GlossaryHeader />
          {filtered.length === 0 ? (
            <div className="emptyState">
              <div className="emptyTitle">No results</div>
              <div className="emptyHint">Try a different keyword or type filter.</div>
            </div>
          ) : (
            <div className="previewGrid">
              {filtered.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  className={`previewCard ${currentWord?.id === w.id ? "previewCard--active" : ""}`}
                  onClick={() => setCurrentWord(w)}
                >
                  <GlossaryPreview name={w.name} pDescription={w.pDescription} />
                  <div className="cardMeta">
                    <span className="typePill">type: {w.type}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default GlossaryMain;