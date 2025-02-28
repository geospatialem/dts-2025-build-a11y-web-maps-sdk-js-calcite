require([
  "esri/core/reactiveUtils"
], (reactiveUtils) => {

  const toggleModeEl = document.getElementById("toggle-mode");
  const mapEl = document.querySelector("arcgis-map");
  const darkModeCss = document.getElementById("jsapi-mode-dark");
  const lightModeCss = document.getElementById("jsapi-mode-light");
  const searchEl = document.getElementById("search-el");
  const expandEl = document.getElementById("expand-el");

  let mode = "light";

  toggleModeEl.addEventListener("click", handleModeChange);

  // reactiveUtils to watch for when the popup is opened and closed
  // Resource: https://developers.arcgis.com/javascript/latest/watch-for-changes/#watch-for-changes-in-the-api
  mapEl.addEventListener("arcgisViewReadyChange", () => {
    reactiveUtils.watch(() => mapEl.view.popup.visible, (visible) => {
        // Wait for the popup to display and set its focus
        // Also... wait for the popup to close to set the arcgis-search focus
        if (mapEl.view.popup.visible) {
          setTimeout(() => {
            mapEl.view.popup.focus();
          }, 500);
        } else {
          searchEl.focusSearch();
        }
      }
    );
  });

  // Initialize the mutation observer
  // Resource: https://developers.arcgis.com/javascript/latest/watch-for-changes/#using-a-mutation-observer
  const observer = new MutationObserver((mutations, observer) => {
    for (let mutation of mutations) {
      // Mutation observer change message
      const mutationMessage = `MutationObserver: ${mutation.attributeName} has changed to ${mutation.target[mutation.attributeName]}`;
      console.log(mutationMessage);
      // Set focus on the arcgis-search if the component is expanded
      // Else set focus on the arcgis-expand
      if (mutation.target[mutation.attributeName] == true) {
        searchEl.focusSearch();
      } else {
        const expandEls = document.querySelectorAll(".esri-expand__toggle > calcite-action");
        expandEls[0].setFocus();
      } 
    }
  });

  // Start observing the arcgis-expand's "expanded" attribute
  observer.observe(expandEl, {
    attributeFilter: ["expanded"]
  });

  function handleModeChange() {
    mode = mode === "dark" ? "light" : "dark";
    const isDarkMode = mode === "dark";
    darkModeCss.disabled = !isDarkMode;
    lightModeCss.disabled = isDarkMode;
    toggleModeEl.icon = isDarkMode ? "moon" : "brightness";
    document.body.className = isDarkMode ? "calcite-mode-dark" : "";
    mapEl.basemap = isDarkMode ? "dark-gray" : "gray";

    document.querySelectorAll(`.calcite-mode-${isDarkMode ? "light" : "dark"}`).forEach(node =>
      node.classList.replace(`calcite-mode-${isDarkMode ? "light" : "dark"}`, `calcite-mode-${mode}`)
    );
  }

});