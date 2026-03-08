import "./style.css";
import { addTodo } from "./app.js";
import { renderTodos } from "./dom.js";

addTodo("Study JS", "Finish todo project", "2026-03-10", "high");
addTodo("Do laundry", "Wash clothes tonight", "2026-03-11", "low");

renderTodos();
