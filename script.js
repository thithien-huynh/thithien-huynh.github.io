const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const filterButtons = document.querySelectorAll(".filter-button");
const projects = document.querySelectorAll(".project");
const workCount = document.querySelector("#work-count");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  primaryNav.classList.toggle("is-open", !isExpanded);
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("is-open");
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-active", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });

    projects.forEach((project) => {
      const isVisible = selectedFilter === "all" || project.dataset.category === selectedFilter;
      project.hidden = !isVisible;
      visibleCount += Number(isVisible);
    });

    workCount.textContent = `${String(visibleCount).padStart(2, "0")} PROJECT${visibleCount === 1 ? "" : "S"}`;
  });
});

document.querySelector("#year").textContent = String(new Date().getFullYear());