# Esri Developer & Technology Summit

## Project Description

This demo app demonstrates how to respect the `prefers-reduced-motion` settings in CSS. It showcases how to read the CSS setting for `prefers-reduced-motion` and disables animations accordingly. Additionally, the app provides a play/pause button so users can re-enable animations if they prefer.

## How to Test `prefers-reduced-motion` with Chrome Developer Tools

To test the `prefers-reduced-motion` setting in Chrome Developer Tools, follow these steps:

1. Open Chrome Developer Tools (F12 or right-click on the page and select "Inspect").
2. Go to the "Rendering" tab.
3. Under the "Emulate CSS media feature prefers-reduced-motion" section, select "Reduce".

For more detailed instructions, refer to the [Chrome Developer Tools Documentation](https://developer.chrome.com/docs/devtools/).

## Accessibility Information

The `prefers-reduced-motion` media query is an important accessibility feature that allows users to reduce or eliminate animations and transitions that can cause motion sickness, distraction, or other issues. For more information on `prefers-reduced-motion` and its impact, visit the following resources:

- [MDN Web Docs: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [WebAIM: Animation and Accessibility](https://webaim.org/techniques/css/#animation)

## WCAG Requirements for Reduced Motion

The Web Content Accessibility Guidelines (WCAG) include specific criteria related to motion and animations to ensure web content is accessible to all users, including those with vestibular disorders. The relevant WCAG criterion is:

### WCAG 2.1 - Guideline 2.3: Seizures and Physical Reactions

**Success Criterion 2.3.3: Animation from Interactions (Level AAA)**

- Motion animation triggered by interaction can be disabled unless the animation is essential to the functionality or the information being conveyed.

For more information on WCAG requirements related to reduced motion, refer to the following resources:

- [WCAG 2.1 Guideline 2.3: Seizures and Physical Reactions](https://www.w3.org/WAI/WCAG21/quickref/#seizures-and-physical-reactions)
- [Understanding Success Criterion 2.3.3: Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)

By adhering to these guidelines, this app helps to provide a more accessible experience for users who may be adversely affected by motion and animations.
