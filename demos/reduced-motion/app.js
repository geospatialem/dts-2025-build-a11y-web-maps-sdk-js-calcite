// DOM Elements
const mapEl = document.querySelector("arcgis-map");
const animationControl = document.getElementById("animationControl");

// Maps to store original and disabled renderers
const originalRenderers = new Map();
const disabledRenderers = new Map();

// Event listeners
animationControl.addEventListener("calciteSwitchChange", (event) => handleAnimation(event.target.checked));
mapEl.addEventListener("arcgisViewReadyChange", handleArcgisViewReadyChange);

/**
 * Handles the ArcGIS view ready change event.
 * Iterates through each layer in the map and clones its renderer.
 * Creates a disabled version of the renderer with animations disabled.
 * Stores the original and disabled renderers in respective maps.
 */
function handleArcgisViewReadyChange() {
    const map = mapEl.map;

    map.layers.forEach(layer => {
        const originalRenderer = layer.renderer?.clone();
        if (originalRenderer) {
            originalRenderers.set(layer.id, originalRenderer);
            disabledRenderers.set(layer.id, disableAnimationsInRenderer(originalRenderer.clone()));
        }
    });

    const mediaQuery = window.matchMedia("(prefers-reduced-motion)");
    animationControl.checked = mediaQuery.matches;
    handleAnimation(mediaQuery.matches);
}

/**
 * Handles the animation control switch change event.
 * Sets the renderer based on the reduced motion preference.
 * @param {boolean} prefersReduced - Indicates if reduced motion is preferred.
 */
function handleAnimation(prefersReduced) {
    const map = mapEl.map;

    map.layers.forEach(layer => {
        const originalRenderer = originalRenderers.get(layer.id);
        const disabledRenderer = disabledRenderers.get(layer.id);

        if (originalRenderer && disabledRenderer) {
            layer.renderer = prefersReduced ? disabledRenderer : originalRenderer;
            layer.refresh();
        }
    });
}

/**
 * Disables animations in the renderer.
 * @param {Object} renderer - The renderer object.
 * @returns {Object} - The renderer with animations disabled.
 */
function disableAnimationsInRenderer(renderer) {
    const disableAnimations = (obj) => {
        for (const key in obj) {
            if (obj[key] && typeof obj[key] === 'object') {
                disableAnimations(obj[key]);
            }
            if (key === 'playAnimation') {
                obj[key] = false;
            }
        }
    };
    disableAnimations(renderer);
    return renderer;
}
