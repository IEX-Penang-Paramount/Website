/**
 * Primary navigation.
 *
 * Single source of truth for the top bar tabs. Adding an entry here adds a tab
 * without touching TopBar.jsx; the matching <Route> still has to be registered
 * in main.jsx.
 *
 * - `end`         : only match the path exactly (needed for "/", which would
 *                   otherwise match every route).
 * - `description` : short blurb, used by the homepage card for that section.
 */

export const NAV_ITEMS = [
  {
    label: "Home",
    path: "/",
    end: true,
  },
  {
    label: "Glossary",
    path: "/glossary",
    description:
      "Local terms for boats, gear, tides, and catch, with the context that gives them meaning.",
  },
  {
    label: "Cultural Map",
    path: "/cultural-map",
    description:
      "Landing sites, jetties, markets, and shrines placed against the coastline they belong to.",
  },
  {
    label: "Story",
    path: "/story",
    description:
      "Recorded accounts from fishers and their families, arranged as readable chapters.",
  },
];

/** Nav entries that represent real content sections (everything but Home). */
export const SECTION_ITEMS = NAV_ITEMS.filter((item) => item.path !== "/");

/**
 * Look up an entry by route path, so a page can title itself from the same
 * config that drives the tabs instead of repeating the label and blurb.
 */
export function getNavItem(path) {
  return NAV_ITEMS.find((item) => item.path === path);
}
