const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menu-toggle");
const overlay = document.getElementById("overlay");

let isTransitioning = false;

export function initSidebar() {
  menuToggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isTransitioning) return;

    isTransitioning = true;
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");

    setTimeout(() => {
      isTransitioning = false;
    }, 350);
  });

  // Keyboard accessibility
  menuToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();

      if (isTransitioning) return;

      isTransitioning = true;
      sidebar.classList.toggle("active");

      setTimeout(() => {
        isTransitioning = false;
      }, 350);
    }
  });
  // klick utanför menyn stänger den
  overlay.addEventListener("click", closeSidebar);
}

export function closeSidebar() {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}