// form
document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------
  // Enforce minimum 24-hour scheduling
  // ----------------------------------
  const dateInput = document.querySelector('input[name="Preferred_Date"]');

  if (dateInput) {
    const now = new Date();
    const minDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const yyyy = minDate.getFullYear();
    const mm = String(minDate.getMonth() + 1).padStart(2, "0");
    const dd = String(minDate.getDate()).padStart(2, "0");

    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  // ----------------------------------
  // Success popup handling
  // ----------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const isSuccess = urlParams.get("success") === "true";

  if (!isSuccess) return;

  const popup = document.getElementById("successPopup");
  const closeBtn = document.getElementById("successPopupClose");

  if (!popup) return;

  popup.classList.add("show");

  closeBtn?.addEventListener("click", () => {
    popup.classList.remove("show");
    cleanUrl();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      popup.classList.remove("show");
      cleanUrl();
    }
  });

  function cleanUrl() {
    const url = new URL(window.location.href);
    url.searchParams.delete("success");
    window.history.replaceState({}, "", url);
  }
});


// navigation
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".menu-button");
  const menu = document.getElementById("main-menu");

  if (!button || !menu) return;

  function openMenu() {
    menu.classList.remove("hidden");
    button.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    menu.classList.add("hidden");
    button.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  }

  button.addEventListener("click", toggleMenu);

  menu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
});
