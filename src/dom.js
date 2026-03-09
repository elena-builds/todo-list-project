import {
  projects,
  setCurrentProject,
  getCurrentProject,
  addTodo,
  toggleTodoCompleted,
  deleteTodo,
} from "./app.js";

function setupTodoForm() {
  const form = document.querySelector("#todo-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#todo-title").value;
    const desc = document.querySelector("#todo-desc").value;
    const date = document.querySelector("#todo-date").value;
    const priority = document.querySelector("#todo-priority").value;

    addTodo(title, desc, date, priority);

    form.reset();
    renderTodos();
  });
}

function renderProjects() {
  const projectList = document.querySelector("#project-list");
  projectList.textContent = "";

  projects.forEach((project) => {
    const projectButton = document.createElement("button");
    projectButton.textContent = project.name;

    projectButton.addEventListener("click", () => {
      setCurrentProject(project.name);
      renderTodos();
    });
    projectList.appendChild(projectButton);
  });
}

function renderTodos() {
  const todoList = document.querySelector("#todo-list");
  todoList.textContent = "";
  const currentProject = getCurrentProject();
  const todos = currentProject.todos;

  todos.forEach((todo) => {
    const todoCard = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = todo.title;

    const dueDate = document.createElement("p");
    dueDate.textContent = `Due: ${todo.dueDate}`;

    const priority = document.createElement("p");
    priority.textContent = `priority: ${todo.priority}`;

    const status = document.createElement("p");
    status.textContent = todo.completed ? "Completed" : "Not completed";

    const completeButton = document.createElement("button");
    completeButton.textContent = "Toggle Complete";

    completeButton.addEventListener("click", () => {
      toggleTodoCompleted(todo.id);
      renderTodos();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      deleteTodo(todo.id);
      renderTodos();
    });

    todoCard.appendChild(title);
    todoCard.appendChild(dueDate);
    todoCard.appendChild(priority);
    todoCard.appendChild(status);
    todoCard.appendChild(completeButton);
    todoCard.appendChild(deleteButton);

    todoList.appendChild(todoCard);
  });
}

function renderApp() {
  renderProjects();
  renderTodos();
  setupTodoForm();
}
export { renderApp };
