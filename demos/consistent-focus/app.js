require(["esri/core/reactiveUtils"], (reactiveUtils) => {

  const toggleModeEl = document.getElementById("toggle-mode");
  const mapEl = document.querySelector("arcgis-map");
  const darkModeCss = document.getElementById("jsapi-mode-dark");
  const lightModeCss = document.getElementById("jsapi-mode-light");
  const actionBarEl = document.getElementById("custom-action-bar");
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
    mapEl.basemap = isDarkMode ? "dark-gray" : "gray";

    document.querySelectorAll(`.calcite-mode-${isDarkMode ? "light" : "dark"}`).forEach(node =>
      node.classList.replace(`calcite-mode-${isDarkMode ? "light" : "dark"}`, `calcite-mode-${mode}`)
    );
  }

    // reactiveUtils to watch for when the popup is opened and closed
    // Resource: https://developers.arcgis.com/javascript/latest/watch-for-changes/#watch-for-changes-in-the-api
    mapEl.addEventListener("arcgisViewReadyChange", () => {
      // Initial layer effect
      updateBloom(bloomIntensity, bloomRadius, bloomThreshold);
      reactiveUtils.watch(() => mapEl.view.popup.visible, (visible) => {
          if (mapEl.view.popup.visible) {
            setTimeout(() => {
              mapEl.view.popup.focus();
          }, 100);
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

  // Active widget
  let activeWidget = "";

  // Layer effects
  const effectBlockSectionEl = document.getElementById("bloom-effect");
  const shadowBlockSectionEl = document.getElementById("shadow-effect");

  let bloomIntensity = 1.5;
  let bloomRadius = 0.5;
  let bloomThreshold = 0.1;

  let shadowLength = 3;
  let shadowDepth = 1;
  let shadowOutline = 3;

  // Bloom effects
  effectBlockSectionEl.addEventListener("calciteBlockSectionToggle", (evt) => {
    if (evt.target.open) {
      shadowBlockSectionEl.open = false;
      updateBloom(bloomIntensity, bloomRadius, bloomThreshold);
    } else {
      updateBloom(0, 0, 0);
    }
  });

  // Drop shadow effects
  shadowBlockSectionEl.addEventListener("calciteBlockSectionToggle", (evt) => {
    if (evt.target.open) {
      effectBlockSectionEl.open = false;
      updateShadow(shadowLength, shadowDepth, shadowOutline);
    } else {
      updateShadow(0, 0, 0);
    }
  });

  // Layer effect values
  const sliderEls = document.querySelectorAll("calcite-slider");
  sliderEls?.forEach((sliderEl) => {
    sliderEl.addEventListener("calciteSliderInput", () => {
      const sliderElId = sliderEl.id;
      // Bloom effects
      if (sliderElId.includes("bloom")) {
        bloomIntensity = document.getElementById("bloom-intensity").value;
        bloomRadius = document.getElementById("bloom-radius").value;
        bloomThreshold = document.getElementById("bloom-threshold").value;
        if (effectBlockSectionEl.open) {
          updateBloom(bloomIntensity, bloomRadius, bloomThreshold);
        }
        // Drop shadow effects
      } else if (sliderElId.includes("shadow")) {
        shadowLength = document.getElementById("shadow-length").value;
        shadowDepth = document.getElementById("shadow-depth").value;
        shadowOutline = document.getElementById("shadow-outline").value;
        if (shadowBlockSectionEl.open) {
          updateShadow(shadowLength, shadowDepth, shadowOutline);
        }
      }
    });
  });

  // Bloom effect
  function updateBloom(bloomIntensity, bloomRadius, bloomThreshold) {
    mapEl.map.layers._items[0].effect = `bloom(${bloomIntensity}, ${bloomRadius}px, ${bloomThreshold})`;
  }

  // Drop shadow effect
  function updateShadow(shadowLength, shadowDepth, shadowOutline) {
    mapEl.map.layers.items[0].effect = `drop-shadow(${shadowLength}px, ${shadowDepth}px, ${shadowOutline}px)`;
  }

  // Active action
  const handleActionBarClick = ({ target }) => {
    if (target.tagName !== "CALCITE-ACTION") {
      return;
    }

    if (activeWidget) {
      activeActionEl = document
        .querySelector(`[data-action-id=${activeWidget}]`)
        .removeAttribute("active");
      activePanelEl = document.querySelector(
        `[data-panel-id=${activeWidget}]`
      ).closed = true;
    }

    const nextWidget = target.dataset.actionId;
    if (nextWidget !== activeWidget) {
      document.querySelector(`[data-action-id=${nextWidget}]`).active = true;
      document.querySelector(`[data-panel-id=${nextWidget}]`).closed = false;
      activeWidget = nextWidget;
      document.querySelector(`[data-panel-id=${nextWidget}]`).setFocus();
    } else {
      activeWidget = null;
    }
  };

  actionBarEl.addEventListener("click", handleActionBarClick);

  // Panel interaction
  const panelEls = document.querySelectorAll("calcite-panel");
  for (let i = 0; i < panelEls.length; i++) {
    panelEls[i].addEventListener("calcitePanelClose", () => {
      document.querySelector(`[data-action-id=${activeWidget}]`).closed = true;
      document.querySelector(`[data-action-id=${activeWidget}]`).active = false;
      document.querySelector(`[data-action-id=${activeWidget}]`).setFocus();
      activeWidget = null;
    });
  }

});