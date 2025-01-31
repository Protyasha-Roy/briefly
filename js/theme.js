document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "light";

    document.documentElement.setAttribute("data-theme", currentTheme);

    themeToggle.addEventListener("click", function () {
        const newTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        themeToggle.textContent = newTheme === "light" ? "Dark" : "Light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });
});
