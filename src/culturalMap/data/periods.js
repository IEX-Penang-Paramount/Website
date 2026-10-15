/* Periods a map object can belong to.

   The periods offered on the page are derived from the data (see
   getFilterOptions() in ./index.js) — listing one here only fixes where it sits
   in the bar and lets it show a label different from its key. A period that
   turns up in the data but not here still gets a button, labelled with its key.

   An object with `period: ""` (or no period field) belongs to no single period:
   it is never filtered out, and never becomes a button. */

export const ALL_PERIODS = "all";

export const PERIODS = {
  past: { label: "Past" },
  present: { label: "Present" },
};

/** Configured order first, then anything unlisted, alphabetically. */
export function comparePeriods(a, b) {
  const order = Object.keys(PERIODS);
  const ia = order.indexOf(a);
  const ib = order.indexOf(b);
  if (ia !== -1 && ib !== -1) return ia - ib;
  if (ia !== -1) return -1;
  if (ib !== -1) return 1;
  return a.localeCompare(b);
}

export function matchesPeriod(item, periodKey) {
  if (!periodKey || periodKey === ALL_PERIODS) return true;
  const own = item.getPeriod();
  return !own || own === periodKey;
}
