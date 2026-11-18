import { createContext, useContext } from "react";

export const ProjectContext = createContext(null);

export function useProject() {
  const project = useContext(ProjectContext);
  if (!project) throw new Error("useProject() must be used inside a project Layout");
  return project;
}

export function useSection(key) {
  return useProject().getSection(key);
}
