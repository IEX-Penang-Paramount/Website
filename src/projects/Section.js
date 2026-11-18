/** One part of a project: its page copy plus the items it lists. Read-only. */
export class Section {
  static KEY = "";
  static PATH = "";
  static LABEL = "";
  static ID_FIELD = "id";

  #ui;
  #items;

  constructor(ui = {}, items = []) {
    this.#ui = ui;
    this.#items = Object.freeze([...items]);
  }

  getKey() {
    return this.constructor.KEY;
  }

  getPath() {
    return this.constructor.PATH;
  }

  getLabel() {
    return this.constructor.LABEL;
  }

  /** PageHeader props that override the page's defaults. */
  getHeader() {
    return this.#ui.header ?? {};
  }

  getBlurb() {
    return this.#ui.blurb ?? "";
  }

  getUi(name) {
    return this.#ui[name];
  }

  getItems() {
    return this.#items;
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  find(id) {
    return this.#items.find((item) => item[this.constructor.ID_FIELD] === id);
  }
}
