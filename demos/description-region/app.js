const toggleModeEl = document.getElementById("toggle-mode");
const mapEl = document.querySelector("arcgis-map");
const darkModeCss = document.getElementById("jsapi-mode-dark");
const lightModeCss = document.getElementById("jsapi-mode-light");

const liveRegion = document.getElementById("liveRegion");
let mode = "light";
toggleModeEl.addEventListener("click", handleModeChange);

mapEl.addEventListener("arcgisViewReadyChange", handleArcgisViewReadyChange);

function handleArcgisViewReadyChange(event) {
  const mapDescription = document.getElementById("map-description");
  const { portalItem } = event.target.map;
  liveRegion.innerText = `${portalItem.title} map has loaded.`;
  mapDescription.innerText = portalItem.snippet;
  document.querySelectorAll(".esri-view-surface").forEach(el =>
    el.setAttribute("aria-describedby", "map-description")
  );
}

function handleModeChange() {
  mode = mode === "dark" ? "light" : "dark";
  const isDarkMode = mode === "dark";
  darkModeCss.disabled = !isDarkMode;
  lightModeCss.disabled = isDarkMode;
  toggleModeEl.icon = isDarkMode ? "moon" : "brightness";
  document.body.className = isDarkMode ? "calcite-mode-dark" : "";

  document.querySelectorAll(`.calcite-mode-${isDarkMode ? "light" : "dark"}`).forEach(node =>
    node.classList.replace(`calcite-mode-${isDarkMode ? "light" : "dark"}`, `calcite-mode-${mode}`)
  );
}
