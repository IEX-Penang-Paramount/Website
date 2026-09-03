import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopBar from "./TopBar.jsx";
import Footer from "./Footer.jsx";
import "./Layout.css";

/**
 * Shared page chrome. Every route renders inside this, so the top bar and
 * footer are defined once and are identical across the site.
 *
 * Also runs the site-wide scroll-reveal: any element tagged `data-reveal`
 * fades up as it nears the viewport. Re-scanned on every route change.
 */
function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let pending = [];
    const scan = () => {
      pending = [...root.querySelectorAll("[data-reveal]:not(.is-in)")];
      check();
    };
    const check = () => {
      const cut = window.innerHeight * 0.9;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < cut) {
          el.classList.add("is-in");
          return false;
        }
        return true;
      });
    };

    if (reduce) {
      root.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
      return;
    }

    scan();
    let ticking = false;
    const onScroll = () => {
      if (ticking || !pending.length) return;
      ticking = true;
      requestAnimationFrame(() => {
        check();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // content height can shift as fonts/images load
    const t1 = setTimeout(scan, 250);
    const t2 = setTimeout(scan, 1200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return (
    <div className="layout">
      <TopBar />
      <main ref={mainRef} key={pathname} className="layout__main site-main route-fade">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
