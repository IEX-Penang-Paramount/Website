import { Link, useParams } from "react-router-dom";
import { GlossaryItem } from "./GlossaryItem";
import { useProject } from "../projects/ProjectContext.js";
import "./GlossaryDisplayPage.css";

export default function GlossaryDisplayPage() {
  const { id } = useParams();
  const project = useProject();
  const glossary = project.getSection("glossary");
  const word = glossary.find(id);

  return (
    <div className="outerWordFrame">
      <div className="returnLink">
        <Link to={project.pathTo(glossary.getPath())}>{"< Back to Glossary"}</Link>
      </div>
      {word ? <GlossaryItem word={word} /> : <div className="wordFrame">Word not found</div>}
    </div>
  );
}
