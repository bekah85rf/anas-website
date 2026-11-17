const sections = document.querySelectorAll("main > div > section");

if (sections.length >= 8) {
  sections[0].id = "home";
  sections[3].id = "about";
  sections[4].id = "portfolio";
  sections[6].id = "services";
  sections[7].id = "contact";
}

document.title = "Atelier Lumière — Editorial Photography";
document.documentElement.style.scrollBehavior = "smooth";

const destinations = {
  home: "home",
  portfolio: "portfolio",
  about: "about",
  services: "services",
  contact: "contact",
  inquire: "contact",
};

document.querySelectorAll("[data-path]").forEach((link) => {
  const destination = destinations[link.dataset.path];
  if (destination) {
    link.href = `#${destination}`;
  }
});

const navigation = document.querySelector("header nav");
const menuButton = document.querySelector('header button[aria-label="Toggle Navigation Menu"]');
const menuIcon = menuButton?.querySelector(".material-symbols-outlined");

if (navigation && menuButton && menuIcon) {
  navigation.id = "site-navigation";
  menuButton.setAttribute("aria-controls", navigation.id);
  menuButton.setAttribute("aria-expanded", "false");

  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuIcon.textContent = "menu";
    navigation.classList.add("hidden");
    navigation.style.removeProperty("position");
    navigation.style.removeProperty("top");
    navigation.style.removeProperty("left");
    navigation.style.removeProperty("right");
    navigation.style.removeProperty("padding");
    navigation.style.removeProperty("background-color");
    navigation.style.removeProperty("box-shadow");
    navigation.style.removeProperty("flex-direction");
    navigation.style.removeProperty("gap");
    navigation.style.display = window.matchMedia("(max-width: 767px)").matches ? "none" : "";
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
      return;
    }

    menuButton.setAttribute("aria-expanded", "true");
    menuIcon.textContent = "close";
    navigation.classList.remove("hidden");
    Object.assign(navigation.style, {
      position: "absolute",
      top: "5rem",
      left: "0",
      right: "0",
      padding: "1.5rem",
      backgroundColor: "#fcf9f4",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
    });
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  window.addEventListener("resize", closeMenu);

  closeMenu();
}

const emailLink = [...document.querySelectorAll("footer a")].find((link) =>
  link.textContent.includes("@"),
);
if (emailLink) {
  emailLink.href = `mailto:${emailLink.textContent.trim()}`;
}
