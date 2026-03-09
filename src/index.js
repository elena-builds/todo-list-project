import "./style.css";
import { addTodo, addProject, setCurrentProject } from "./app.js";
import { renderApp } from "./dom.js";

addProject("Work");
addProject("Study");

addTodo("Buy groceries", "Milk and eggs", "2026-03-10", "medium");

setCurrentProject("Work");
addTodo("Finish report", "Complete monthly report", "2026-03-11", "high");

setCurrentProject("Study");
addTodo(
  "Read JavaScript notes",
  "Review modules and webpack",
  "2026-03-12",
  "low",
);

setCurrentProject("Default");
renderApp();
