import { createProject } from "./project.js";
import { createTodo } from "./todo.js";
import { saveProjects, loadProjects } from "./storage.js";

const storedProjects = loadProjects();

const projects = storedProjects || [];

if (projects.length === 0) {
  const defaultProject = createProject("Default");
  projects.push(defaultProject);
}

let currentProject = projects[0];

function saveApp() {
  saveProjects(projects);
}

function addTodo(title, description, dueDate, priority) {
  const todo = createTodo(title, description, dueDate, priority);
  currentProject.todos.push(todo);
  saveApp();
}

function addProject(name) {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return false;
  }
  const alreadyExists = projects.some(
    (project) => project.name.toLowerCase() === trimmedName.toLowerCase(),
  );

  if (alreadyExists) {
    return false;
  }

  const project = createProject(trimmedName);
  projects.push(project);
  saveApp();
  return true;
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

function toggleTodoCompleted(todoId) {
  const todo = currentProject.todos.find((todo) => todo.id === todoId);

  if (todo) {
    todo.completed = !todo.completed;
    saveApp();
  }
}

function deleteTodo(todoId) {
  currentProject.todos = currentProject.todos.filter(
    (todo) => todo.id !== todoId,
  );
  saveApp();
}

function updateTodo(todoId, updatedData) {
  const todo = currentProject.todos.find((todo) => todo.id === todoId);

  if (todo) {
    todo.title = updatedData.title;
    todo.description = updatedData.description;
    todo.dueDate = updatedData.dueDate;
    todo.priority = updatedData.priority;
    saveApp();
  }
}

export {
  projects,
  addTodo,
  addProject,
  setCurrentProject,
  getCurrentProject,
  toggleTodoCompleted,
  deleteTodo,
  updateTodo,
};
