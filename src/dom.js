import {
  projects,
  setCurrentProject,
  getCurrentProject,
  addTodo,
  addProject,
  toggleTodoCompleted,
  deleteTodo,
  updateTodo,
} from "./app.js";

let selectedTodoId = null;

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
    renderTodoDetails();
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
      selectedTodoId = null;
      renderTodos();
      renderTodoDetails();
    });
    projectList.appendChild(projectButton);
  });
}

function renderTodos() {
  const todoList = document.querySelector("#todo-list");
  todoList.textContent = "";
  const currentProject = getCurrentProject();
  const todos = currentProject.todos;

  if (todos.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No todos in this project yet.";
    todoList.appendChild(emptyMessage);
    return;
  }

  todos.forEach((todo) => {
    const todoCard = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = todo.title;
    if (todo.completed) {
      title.textContent = `${todo.title} ✅`;
    }

    const dueDate = document.createElement("p");
    dueDate.textContent = `Due: ${todo.dueDate}`;

    const priority = document.createElement("p");
    priority.textContent = `priority: ${todo.priority}`;

    const status = document.createElement("p");
    status.textContent = todo.completed ? "Completed" : "Not completed";

    const completeButton = document.createElement("button");
    completeButton.textContent = "Toggle Complete";

    completeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleTodoCompleted(todo.id);
      renderTodos();
      renderTodoDetails();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTodo(todo.id);

      if (selectedTodoId === todo.id) {
        selectedTodoId = null;
      }
      renderTodos();
      renderTodoDetails();
    });

    todoCard.appendChild(title);
    todoCard.appendChild(dueDate);
    todoCard.appendChild(priority);
    todoCard.appendChild(status);
    todoCard.appendChild(completeButton);
    todoCard.appendChild(deleteButton);

    todoList.appendChild(todoCard);

    todoCard.addEventListener("click", () => {
      selectedTodoId = todo.id;
      renderTodoDetails();
    });

    todoCard.classList.add("todo-card");
    if (todo.priority === "high") {
      todoCard.classList.add("priority-high");
    } else if (todo.priority === "medium") {
      todoCard.classList.add("priority-medium");
    } else {
      todoCard.classList.add("priority-low");
    }
    if (todo.completed) {
      todoCard.classList.add("completed");
    }
  });
}

function setupProjectForm() {
  const form = document.querySelector("#project-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const projectNameInput = document.querySelector("#project-name");
    const projectName = projectNameInput.value;

    const wasAdded = addProject(projectName);

    if (!wasAdded) {
      alert("Project name is empty or already exists.");
      return;
    }

    form.reset();
    renderProjects();
  });
}

function renderTodoDetails() {
  const detailsContainer = document.querySelector("#todo-details");
  detailsContainer.textContent = "";

  if (!selectedTodoId) {
    return;
  }

  const currentProject = getCurrentProject();
  const todo = currentProject.todos.find((todo) => todo.id === selectedTodoId);

  if (!todo) {
    return;
  }

  const heading = document.createElement("h2");
  heading.textContent = "Todo Details";

  const form = document.createElement("form");

  const titleInput = document.createElement("input");
  titleInput.value = todo.title;
  titleInput.required = true;

  const descInput = document.createElement("input");
  descInput.value = todo.description;

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = todo.dueDate;

  const prioritySelect = document.createElement("select");

  const lowOption = document.createElement("option");
  lowOption.value = "low";
  lowOption.textContent = "Low";

  const mediumOption = document.createElement("option");
  mediumOption.value = "medium";
  mediumOption.textContent = "Medium";

  const highOption = document.createElement("option");
  highOption.value = "high";
  highOption.textContent = "High";

  prioritySelect.appendChild(lowOption);
  prioritySelect.appendChild(mediumOption);
  prioritySelect.appendChild(highOption);
  prioritySelect.value = todo.priority;

  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.textContent = "Save Changes";

  form.appendChild(titleInput);
  form.appendChild(descInput);
  form.appendChild(dateInput);
  form.appendChild(prioritySelect);
  form.appendChild(saveButton);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    updateTodo(todo.id, {
      title: titleInput.value,
      description: descInput.value,
      dueDate: dateInput.value,
      priority: prioritySelect.value,
    });
    renderTodos();
    renderTodoDetails();
  });
  detailsContainer.appendChild(heading);
  detailsContainer.appendChild(form);
}

function renderApp() {
  renderProjects();
  renderTodos();
  renderTodoDetails();
  setupTodoForm();
  setupProjectForm();
}
export { renderApp };
