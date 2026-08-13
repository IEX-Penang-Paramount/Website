import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../../config/navigation.js";
import { SITE } from "../../config/site.js";
import "./TopBar.css";

/**
 * Fixed navigation bar. Stays put while the page scrolls beneath it.
 * Tabs are generated from NAV_ITEMS, so this file never names a route.
 */
function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <NavLink className="topbar__brand" to="/">
          {SITE.name}
        </NavLink>

        <nav className="topbar__nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                isActive ? "topbar__tab topbar__tab--active" : "topbar__tab"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default TopBar;
