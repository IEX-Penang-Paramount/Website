import { lazy } from "react";
import { Section } from "../projects/Section.js";

/* Key a glob result by filename without extension: "./Content/A1.jsx" -> "A1". */
function byStem(modules, wrap = (m) => m) {
  return Object.fromEntries(
    Object.entries(modules).map(([path, mod]) => [
      path.split("/").pop().replace(/\.[^.]+$/, ""),
      wrap(mod),
    ])
  );
}

export class StoriesSection extends Section {
  static KEY = "stories";
  static PATH = "story";
  static LABEL = "Story";
  static ID_FIELD = "articleID";

  #images;
  #content;

  constructor(ui, { list = [], images = {}, content = {} } = {}) {
    super(ui, list);
    this.#images = byStem(images);
    this.#content = byStem(content, lazy);
  }

  getImage(articleID) {
    return this.#images[articleID] ?? null;
  }

  getContent(articleID) {
    return this.#content[articleID] ?? null;
  }
}
