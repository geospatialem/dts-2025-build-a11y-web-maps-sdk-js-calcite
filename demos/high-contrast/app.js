require(["esri/Basemap"], (Basemap) => {

  const mapEl = document.getElementById("mapEl");

  // High contrast basemap (dark)
  const highContrastDarkBasemap = new Basemap({
    portalItem: {
      id: "3e23478909194c54992eaaee78b5f754" // Dark
    },
    title: "High contrast dark theme",
    id: "high-contrast-dark"
  });

  // High contrast basemap (light)
  const highContrastLightBasemap = new Basemap({
    portalItem: {
      id: "084291b0ecad4588b8c8853898d72445" // Light
    },
    title: "High contrast (light theme)",
    id: "high-contrast-light"
  });

  // Mode
  let mode = "light";
  const toggleModeEl = document.getElementById("toggle-mode");
  const darkModeCss = document.getElementById("jsapi-mode-dark");
  const lightModeCss = document.getElementById("jsapi-mode-light");

  toggleModeEl.addEventListener("click", handleModeChange);

  function handleModeChange() {
    mode = mode === "dark" ? "light" : "dark";
    const isDarkMode = mode === "dark";
    darkModeCss.disabled = !isDarkMode;
    lightModeCss.disabled = isDarkMode;
    toggleModeEl.icon = isDarkMode ? "moon" : "brightness";
    document.body.className = isDarkMode ? "calcite-mode-dark" : "";

    // If high contrast is enabled, display a high contrast basemap
    // Else display a gray basemap
    if (contrastMedia.matches) {
      mapEl.basemap = isDarkMode ? highContrastDarkBasemap : highContrastLightBasemap;
    } else {
      mapEl.basemap = isDarkMode ? "dark-gray-vector" : "gray-vector";
    }
  
    document.querySelectorAll(`.calcite-mode-${isDarkMode ? "light" : "dark"}`).forEach(node =>
      node.classList.replace(`calcite-mode-${isDarkMode ? "light" : "dark"}`, `calcite-mode-${mode}`)
    );
  }

  // High contrast support with basemap and layer effects
  const contrastMedia = matchMedia("(forced-colors: active)");
  function checkContrastMedia() {
    try {
      if (mode == "dark") {
        mapEl.basemap = contrastMedia.matches ? highContrastDarkBasemap : "dark-gray-vector";
        //mapEl.basemap = "dark-gray-vector";
        contrastMedia.matches ? mapEl.map.layers._items[2].effect = "bloom(1.5, 0.5px, 0.1)" : mapEl.map.layers._items[2].effect = "bloom(0, 0px, 0)";
      } else {
        mapEl.basemap = contrastMedia.matches ? highContrastLightBasemap : "gray-vector";
        //mapEl.basemap = "gray-vector";
        contrastMedia.matches ? mapEl.map.layers._items[2].effect = "drop-shadow(3px, 1px, 3px)" : mapEl.map.layers._items[2].effect = "drop-shadow(0px, 0px, 0px)";
      }
    } catch(err) { }
  }

  // Event listeners on map load and high contrast media query
  mapEl.addEventListener("arcgisViewChange", checkContrastMedia);
  contrastMedia.addListener(checkContrastMedia);

});