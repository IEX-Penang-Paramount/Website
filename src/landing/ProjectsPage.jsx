import PageHeader from "../components/ui/PageHeader.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import { PROJECTS } from "../projects/index.js";

/** Makeshift routing page: where a visitor picks a project. */
function ProjectsPage() {
  return (
    <main className="route-fade">
      <title>Projects</title>
      <PageHeader
        eyebrow="The projects"
        title="Choose a project"
        lead="Each project keeps its own map, glossary and recorded accounts."
      >
        <Button variant="secondary" to="/">
          Back to the start
        </Button>
      </PageHeader>

      <section className="section">
        <div className="container card-grid">
          {PROJECTS.map((project) => (
            <Card
              key={project.getId()}
              title={project.getName()}
              description={project.getSummary()}
              to={project.getBasePath()}
              linkLabel="Enter"
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProjectsPage;
