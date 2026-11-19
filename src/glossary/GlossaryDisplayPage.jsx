import { Link, useParams } from "react-router-dom";
import { useProject } from "../projects/ProjectContext.js";
import "./GlossaryDisplayPage.css";

export default function GlossaryDisplayPage() {
  const { id } = useParams();
  const project = useProject();
  const glossary = project.getSection("glossary");
  const word = glossary.find(id);
  const entries = glossary.getItems();
  const position = word ? entries.indexOf(word) : -1;
  const next = entries[position + 1];
  const category = word ? glossary.categoryOf(word.type) : null;
  const backPath = project.pathTo(glossary.getPath());

  if (!word) return <main className="glossary-detail glossary-detail--missing"><p>Entry not found.</p><Link to={backPath}>Back to glossary</Link></main>;

  return (
    <article className="glossary-detail">
      <header className="glossary-detail__hero">
        <div className="glossary-detail__hero-inner container">
          <Link className="glossary-detail__back" to={backPath}>← Back to glossary</Link>
          <div className="glossary-detail__identity">
            <p className="glossary-detail__eyebrow">{project.getName()} <span aria-hidden="true">/</span> {category?.label || "Glossary"}</p>
            <h1>{word.name}</h1>
            <p className="glossary-detail__summary">{word.pDescription}</p>
          </div>
          <span className="glossary-detail__number" aria-hidden="true">{String(position + 1).padStart(2, "0")}</span>
        </div>
      </header>
      <div className="glossary-detail__content container">
        <aside className="glossary-detail__aside"><span>From the glossary</span><strong>{category?.label || project.getName()}</strong></aside>
        <div className="glossary-detail__article">
          {word.imagePath && <figure className="glossary-detail__photo"><img src={word.imagePath} alt={word.imageAlt || word.name} />{word.imageCaption && <figcaption>{word.imageCaption}</figcaption>}</figure>}
          <section aria-labelledby="detail-about"><h2 id="detail-about">The meaning behind the word</h2><p>{word.sDescription}</p></section>
          {word.example && <section className="glossary-detail__context" aria-labelledby="detail-context"><h2 id="detail-context">In context</h2><p>{word.example}</p></section>}
        </div>
      </div>
      <nav className="glossary-detail__next" aria-label="Continue exploring glossary"><div className="container"><span>Keep exploring</span>{next ? <Link to={project.pathTo(glossary.getPath(), next.id)}>{next.name} <span aria-hidden="true">↗</span></Link> : <Link to={backPath}>All glossary entries <span aria-hidden="true">↗</span></Link>}</div></nav>
    </article>
  );
}
