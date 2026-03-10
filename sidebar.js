let isTransitioning = false;

function toggleSidebar() {
  if (isTransitioning) return;

  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  isTransitioning = true;
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");

  setTimeout(() => {
    isTransitioning = false;
  }, 350);
}

export function initSidebar() {
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menu-toggle");
  const overlay = document.getElementById("overlay");

  if (!sidebar || !menuToggle || !overlay) {
    console.warn("Sidebar elements not found");
    return;
  }

  menuToggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSidebar();
  });

  // Keyboard accessibility
  menuToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      toggleSidebar();
    }
  });

  // klick utanför menyn stänger den
  overlay.addEventListener("click", closeSidebar);
}

export function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (sidebar) sidebar.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
}