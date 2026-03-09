import { createProject } from "./project.js";
import { createTodo } from "./todo.js";

const projects = [];

const defaultProject = createProject("Default");
projects.push(defaultProject);

let currentProject = defaultProject;

function addTodo(title, description, dueDate, priority) {
  const todo = createTodo(title, description, dueDate, priority);
  currentProject.todos.push(todo);
}

function addProject(name) {
  const project = createProject(name);
  projects.push(project);
}

function setCurrentProject(projectName) {
  const selectedProject = projects.find(
    (project) => project.name === projectName,
  );

  if (selectedProject) {
    currentProject = selectedProject;
  }
}

function getCurrentProject() {
  return currentProject;
}

export { projects, addTodo, addProject, setCurrentProject, getCurrentProject };
