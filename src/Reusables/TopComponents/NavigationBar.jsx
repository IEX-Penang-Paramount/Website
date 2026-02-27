import { Link } from "react-router-dom";

  export function NavigationBar() {
    return (<nav className="tabs" aria-label="Primary navigation">
            <Link className="tab" to="/glossary">
              Glossary
            </Link>
            <Link className="tab" to="/cultural-map">
              Cultural Map
            </Link>
            <Link className="tab" to="/story">
              Story
            </Link>
          </nav>);
  }