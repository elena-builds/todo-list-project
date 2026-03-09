import { projects, setCurrentProject, getCurrentProject } from "./app.js";

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

    todoCard.appendChild(title);
    todoCard.appendChild(dueDate);
    todoCard.appendChild(priority);

    todoList.appendChild(todoCard);
  });
}

function renderApp() {
  renderProjects();
  renderTodos();
}
export { renderApp };
