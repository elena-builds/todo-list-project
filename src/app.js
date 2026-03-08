import { createProject } from "./project.js";

const projects = [];
const defaultProject = createProject("Default");

projects.push(defaultProject);

let currentProject = defaultProject;
export { projects, currentProject };
