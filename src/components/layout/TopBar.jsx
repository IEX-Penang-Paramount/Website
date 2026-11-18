import { Link, NavLink } from "react-router-dom";
import { ALL_PROJECTS } from "../../projects/Project.js";
import { useProject } from "../../projects/ProjectContext.js";
import "./TopBar.css";

const tabClass = ({ isActive }) =>
  isActive ? "topbar__tab topbar__tab--active" : "topbar__tab";

/** Fixed navigation bar. Its tabs are the current project's sections. */
function TopBar() {
  const project = useProject();

  return (
    <header className="topbar">
      <div className="topbar__inner">
        <Link className="topbar__brand" to={project.getBasePath()}>
          {project.getName()}
        </Link>

        <nav className="topbar__nav" aria-label="Primary">
          <NavLink to={project.getBasePath()} end className={tabClass}>
            Home
          </NavLink>
          {project.getSections().map((section) => (
            <NavLink
              key={section.getKey()}
              to={project.pathTo(section.getPath())}
              className={tabClass}
            >
              {section.getLabel()}
            </NavLink>
          ))}
          <Link className="topbar__tab" to={ALL_PROJECTS}>
            All projects
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default TopBar;
