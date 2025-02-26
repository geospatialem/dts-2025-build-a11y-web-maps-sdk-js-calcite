# Esri Developer & Technology Summit

### Project description

This demo app demonstrates how to respect the `prefers-reduced-motion` settings in CSS. It showcases how to read the CSS setting for `prefers-reduced-motion` and disables animations accordingly. Additionally, the app provides a play/pause button so users can re-enable animations if they prefer.

### How to Test `prefers-reduced-motion` with Chrome Developer Tools

To test the `prefers-reduced-motion` setting in Chrome Developer Tools, follow these steps:

1. Open Chrome Developer Tools (F12 or right-click on the page and select "Inspect").
2. Go to the "Rendering" tab.
3. Under the "Emulate CSS media feature prefers-reduced-motion" section, select "Reduce".

For more detailed instructions, refer to [Chrome Developer Tools Documentation](https://developer.chrome.com/docs/devtools/).

### Accessibility Information

The `prefers-reduced-motion` media query is an important accessibility feature that allows users to reduce or eliminate animations and transitions that can cause motion sickness, distraction, or other issues. For more information on `prefers-reduced-motion` and its impact, visit the following resources:

- [MDN Web Docs: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [WebAIM: Animation and Accessibility](https://webaim.org/techniques/css/#animation)

By respecting the `prefers-reduced-motion` setting, this app ensures a more inclusive and comfortable user experience for individuals who are sensitive to motion.
