# Esri Developer & Technology Summit Template - Map Description

## Project Description

This application demonstrates how to enhance accessibility by setting the `aria-describedby` attribute for the map element. Additionally, it showcases the use of `aria-live` regions to provide dynamic updates for assistive technologies. Note: Some assistive technologies such as [Narrator](https://a11ysupport.io/tech/aria/aria-describedby_attribute) may not support aria-describedby

## Testing `aria-describedby`

### Using Chrome Developer Tools

1. Open your application in Google Chrome.
2. Right-click on the map element and select "Inspect" to open the Developer Tools.
3. In the Elements panel, ensure the map element has the `aria-describedby` attribute set.
4. Verify that the value of `aria-describedby` corresponds to the ID of the element containing the description.

### Using a Screen Reader

1. Open your application in a web browser.
2. Activate your screen reader (e.g., NVDA, JAWS, VoiceOver).
3. Navigate to the map element using the screen reader's navigation commands.
4. Listen to the description read by the screen reader, ensuring it matches the content of the element referenced by `aria-describedby`.

## Accessibility Information

The `aria-describedby` attribute is used to provide additional descriptive information for an element, which can be especially useful for users of assistive technologies. By linking the element to another element that contains the description, screen readers can convey more context and details to users, enhancing their understanding and interaction with the web content. This is particularly important for complex elements like maps, where visual information needs to be translated into meaningful text descriptions.

### Why Use `aria-describedby` Instead of `aria-label`

While both `aria-describedby` and `aria-label` are used to provide accessible descriptions, they serve different purposes. The `aria-label` attribute is used to provide a concise, accessible name for an element, which is typically short and to the point. In contrast, `aria-describedby` is used to link an element to another element that contains a more detailed description. This is particularly useful for complex elements like maps, where a brief label would not suffice to convey all necessary information. By using `aria-describedby`, we can provide users with assistive technologies a richer, more informative description that enhances their understanding and interaction with the map.

For more information on how to use `aria-describedby`, refer to the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby).

## Understanding `aria-live`

The `aria-live` attribute is used to indicate that an element will be updated dynamically, and that those updates should be communicated to assistive technologies. This is particularly useful for content that changes frequently or asynchronously, such as notifications, chat messages, or live sports scores.

### How `aria-live` Works

When an element has the `aria-live` attribute, screen readers will monitor changes to the content of that element and announce those changes to the user. The `aria-live` attribute can take several values:

- **off**: Default value. Updates are not announced.
- **polite**: Updates are announced at the next available opportunity, allowing the user to finish their current task without interruption.
  -- **assertive**: Updates are announced immediately, interrupting the current task. This should be used sparingly and only for critical updates.
  +- **assertive**: Updates are announced immediately, interrupting the current task. **This should be used sparingly and only for critical updates.**

### When to Use `aria-live`

Use `aria-live` in scenarios where dynamic content updates need to be communicated to users of assistive technologies. Examples include:

- **Notifications**: Announcing new messages or alerts.
- **Form Validation**: Informing users of errors or successful submissions.
- **Live Data**: Updating users with real-time information, such as stock prices or sports scores.

By appropriately using `aria-live`, developers can ensure that dynamic content is accessible and that users are kept informed of important updates without unnecessary interruptions.

For more information on how to use `aria-live`, refer to the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions).

## WCAG Requirements for `aria-describedby`

The Web Content Accessibility Guidelines (WCAG) provide recommendations for making web content more accessible. The use of the `aria-describedby` attribute aligns with several WCAG success criteria, including:

- **1.1.1 Non-text Content**: Ensures that all non-text content that is presented to the user has a text alternative that serves the equivalent purpose.
- **1.3.1 Info and Relationships**: Ensures that information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.
- **4.1.2 Name, Role, Value**: Ensures that for all user interface components, the name and role can be programmatically determined, and states, properties, and values that can be set by the user can be programmatically set and notified to the user agents, including assistive technologies.

By using `aria-describedby`, developers can provide additional context and descriptions for elements, which helps meet these WCAG criteria and improves the overall accessibility of web applications.

For more detailed information on WCAG, visit the [W3C Web Accessibility Initiative (WAI) website](https://www.w3.org/WAI/standards-guidelines/wcag/).
