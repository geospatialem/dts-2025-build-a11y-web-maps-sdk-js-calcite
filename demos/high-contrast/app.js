const toggleModeEl = document.getElementById("toggle-mode");
const mapEl = document.querySelector("arcgis-map");
const darkModeCss = document.getElementById("jsapi-mode-dark");
const lightModeCss = document.getElementById("jsapi-mode-light");
const liveRegion = document.getElementById("liveRegion");
const searchEl = document.getElementById("search-el");
const expandEl = document.getElementById("expand-el");

let mode = "light";

toggleModeEl.addEventListener("click", handleModeChange);


function handleModeChange() {
  mode = mode === "dark" ? "light" : "dark";
  const isDarkMode = mode === "dark";
  darkModeCss.disabled = !isDarkMode;
  lightModeCss.disabled = isDarkMode;
  toggleModeEl.icon = isDarkMode ? "moon" : "brightness";
  document.body.className = isDarkMode ? "calcite-mode-dark" : "";
  mapEl.basemap = isDarkMode ? "dark-grey" : "grey";

  document.querySelectorAll(`.calcite-mode-${isDarkMode ? "light" : "dark"}`).forEach(node =>
    node.classList.replace(`calcite-mode-${isDarkMode ? "light" : "dark"}`, `calcite-mode-${mode}`)
  );
}