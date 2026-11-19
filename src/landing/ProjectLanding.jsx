import PageHeader from "../components/ui/PageHeader.jsx";
import Card from "../components/ui/Card.jsx";
import { useProject } from "../projects/ProjectContext.js";
import "./ProjectLanding.css";

/** The default project front page: what it is, and a card into each section. */
function ProjectLanding() {
  const project = useProject();

  return (
    <div className={`project-front project-front--${project.getId()}`}>
      <PageHeader
        eyebrow={project.getKicker()}
        title={project.getName()}
        lead={project.getSummary()}
      />

      <section className="section">
        <div className="container card-grid">
          {project.getSections().map((section) => (
            <Card
              key={section.getKey()}
              title={section.getLabel()}
              description={section.getBlurb()}
              to={project.pathTo(section.getPath())}
              linkLabel="Open"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProjectLanding;
