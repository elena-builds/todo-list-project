function saveProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjects() {
  const storedProjects = localStorage.getItem("projects");

  if (!storedProjects) {
    return null;
  }
  return JSON.parse(storedProjects);
}

export { saveProjects, loadProjects };
