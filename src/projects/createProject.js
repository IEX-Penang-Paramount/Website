import { Project } from "./Project.js";
import { GlossarySection } from "../glossary/GlossarySection.js";
import { MapSection } from "../culturalMap/data/MapSection.js";
import { StoriesSection } from "../stories/StoriesSection.js";

// Nav order. A section appears only when the project supplies its data.
const SECTION_CLASSES = [GlossarySection, MapSection, StoriesSection];

export function createProject(ui, data) {
  return new Project(
    ui,
    SECTION_CLASSES.filter((SectionClass) => data[SectionClass.KEY]).map(
      (SectionClass) => new SectionClass(ui[SectionClass.KEY], data[SectionClass.KEY])
    )
  );
}
