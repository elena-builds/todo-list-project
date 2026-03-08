import { currentProject } from "./app.js";

function renderTodos() {
  const todoList = document.querySelector("#todo-list");
  todoList.textContent = "";

  const todos = currentProject.todos;

  todos.forEach((todo) => {
    const todoCard = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = todo.title;

    const dueDate = document.createElement("p");
    dueDate.textContent = `Due: ${todo.dueDate}`;

    const priority = document.createElement("p");
    priority.textContent = `priority: ${todo.priority}`;

    todoCard.appendChild(title);
    todoCard.appendChild(dueDate);
    todoCard.appendChild(priority);

    todoList.appendChild(todoCard);
  });
}

export { renderTodos };
