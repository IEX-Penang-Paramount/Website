import { stories } from "./StoryData.js";

// import.meta.glob needs literal paths, so each project keeps its own pair.
export default {
  list: stories,
  images: import.meta.glob("./Images/*", { eager: true, import: "default" }),
  content: import.meta.glob("./Content/*.jsx"),
};
