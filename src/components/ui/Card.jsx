import { Link } from "react-router-dom";
import "./Card.css";

/**
 * Text card linking to a section of the site. Title, description, and a plain
 * text link — no icon slot, no imagery.
 */
function Card({ title, description, to, linkLabel = "View" }) {
  return (
    <article className="card">
      <h3 className="card__title">{title}</h3>
      <p className="card__body">{description}</p>
      <Link className="card__link" to={to}>
        {linkLabel} <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

export default Card;
