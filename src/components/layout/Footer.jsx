import { Link } from "react-router-dom";
import { ALL_PROJECTS } from "../../projects/Project.js";
import { useProject } from "../../projects/ProjectContext.js";
import "./Footer.css";

function Footer() {
  const project = useProject();

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <span className="footer__copy">
          © {new Date().getFullYear()} {project.getName()}
        </span>

        <nav className="footer__links" aria-label="Footer">
          <Link className="footer__link" to={ALL_PROJECTS}>
            All projects
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
