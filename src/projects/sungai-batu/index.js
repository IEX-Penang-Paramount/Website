import { createProject } from "../createProject.js";
import ui from "./ui.js";
import glossary from "./data/glossary.js";
import map from "./data/map/index.js";
import stories from "./data/stories/index.js";

export default createProject(ui, { glossary, map, stories });
