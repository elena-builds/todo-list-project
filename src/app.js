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
export { projects, currentProject, addTodo };
