import { Section } from "../projects/Section.js";

const NO_CATEGORY = { label: "", color: "var(--color-ink-muted)" };

export class GlossarySection extends Section {
  static KEY = "glossary";
  static PATH = "glossary";
  static LABEL = "Glossary";

  #categories;

  constructor(ui, { categories = [], entries = [] } = {}) {
    super(ui, entries);
    this.#categories = Object.freeze([...categories]);
  }

  getCategories() {
    return this.#categories;
  }

  categoryOf(type) {
    return (
      this.#categories.find((c) => c.type === type) ?? this.#categories[0] ?? NO_CATEGORY
    );
  }

  numberOf(entry) {
    return this.getItems().indexOf(entry) + 1;
  }
}
