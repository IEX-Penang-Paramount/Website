import { Outlet } from "react-router-dom";
import TopBar from "./TopBar.jsx";
import Footer from "./Footer.jsx";
import "./Layout.css";

/**
 * Shared page chrome. Every route renders inside this, so the top bar and
 * footer are defined once and are identical across the site.
 */
function Layout() {
  return (
    <div className="layout">
      <TopBar />
      <main className="layout__main site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
