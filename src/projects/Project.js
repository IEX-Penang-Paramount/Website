/** The routing page, which lists every project. */
export const ALL_PROJECTS = "/projects";

/** A project: its UI config plus the sections built from its data. Read-only. */
export class Project {
  #ui;
  #sections;

  constructor(ui, sections = []) {
    this.#ui = ui;
    this.#sections = Object.freeze([...sections]);
  }

  getId() {
    return this.#ui.id;
  }

  getName() {
    return this.#ui.name;
  }

  getBasePath() {
    return this.#ui.basePath;
  }

  getKicker() {
    return this.#ui.kicker;
  }

  getSummary() {
    return this.#ui.summary;
  }

  getSections() {
    return this.#sections;
  }

  getSection(key) {
    return this.#sections.find((section) => section.getKey() === key);
  }

  /** A project-specific component replacing a shared page, if one is set. */
  getPage(key) {
    return this.#ui.pages?.[key];
  }

  pathTo(...parts) {
    return [this.#ui.basePath, ...parts].join("/");
  }
}
