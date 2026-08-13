import { Link } from "react-router-dom";
import "./Button.css";

/**
 * Action link.
 *
 * Renders a router <Link> when given `to`, a plain <a> when given `href`.
 * There are no <button> usages on the site yet; if one is needed later it
 * belongs here as a third branch rather than as a new component.
 *
 * @param {"primary"|"secondary"} [variant="primary"]
 */
function Button({ variant = "primary", to, href, children }) {
  const className = `btn btn--${variant}`;

  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}

export default Button;
