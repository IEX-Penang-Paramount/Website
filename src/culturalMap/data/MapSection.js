import { Section } from "../../projects/Section.js";
import { createMapObject } from "./MapObject.js";
import { PERIODS, ALL_PERIODS, comparePeriods } from "./periods.js";

function collectPeriods(items, found = new Set()) {
  items.forEach((item) => {
    if (item.getPeriod()) found.add(item.getPeriod());
    collectPeriods(item.getChildren(), found);
  });
  return found;
}

/** A project's map. Its items are the top-level map objects. */
export class MapSection extends Section {
  static KEY = "map";
  static PATH = "cultural-map";
  static LABEL = "Cultural Map";

  #categories;
  #center;
  #zoom;
  #filterOptions;

  constructor(ui, { roots = [], categories = {}, center, zoom = 15 } = {}) {
    super(ui, roots.map((json) => createMapObject(json, { categories })));
    this.#categories = categories;
    this.#center = center;
    this.#zoom = zoom;
    // "All", then every period found in the data — never a hardcoded pair.
    this.#filterOptions = Object.freeze([
      { key: ALL_PERIODS, label: "All" },
      ...[...collectPeriods(this.getItems())]
        .sort(comparePeriods)
        .map((key) => ({ key, label: PERIODS[key]?.label ?? key })),
    ]);
  }

  getCategories() {
    return this.#categories;
  }

  getCenter() {
    return this.#center;
  }

  getZoom() {
    return this.#zoom;
  }

  getFilterOptions() {
    return this.#filterOptions;
  }
}
