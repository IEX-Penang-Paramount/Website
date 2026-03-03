import React, { useMemo, useState } from "react";
import { TopBar } from "../Reusables/TopComponents/TopBar";
import { GlossaryPreview } from "./GlossaryPreview";
import "./Glossary.css";
import { glossaryData } from "./glossaryData";
function GlossaryMain() {
  // Mock data (replace with your real data source later)
  
  const glossaryDataMem = useMemo(
    () => glossaryData,
    []
  );
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all"); // all | a | b | c
  const [currentWord, setCurrentWord] = useState(null);
  
  const SelectionMenu = () => (
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
                  </label>);

  const GlossaryHeader = () => (
              <header className="glossaryHeader">
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


                </div>
              </header>);

  //AI wrote this but Memoised design to reduce repetition, passable
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return glossaryDataMem.filter((w) => {
      const matchesType = typeFilter === "all" ? true : w.type === typeFilter;
      const matchesQuery =
        q.length === 0
          ? true
          : w.name.toLowerCase().includes(q) || w.pDescription.toLowerCase().includes(q);

      return matchesType && matchesQuery;
    });
  }, [glossaryDataMem, search, typeFilter]);

  return (
    <div className="glossaryPage">
      <TopBar />
      <main className="glossaryMain">
        <section className="gridWrap" aria-label="Glossary preview list">
        
        <GlossaryHeader />
        <SelectionMenu/>
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