---
group: "foundations"
icon: "mdi:accessible"
title: "Accessibility"
---

# Accessibility

> We want everyone to be able to use Dusk. To achieve that, we must put accessibility at the center of our designs.

## Target Standards

Dusk aims for Web Content Accessibility Guidelines (WCAG) 2.1 AA compliance. This includes all of WCAG 2.0 AA plus additional considerations.

## Considerations

Dusk aims to actively consider the needs of users whose disabilities fall into any of the following categories:

* __Visual__: Anything disabilities related to sight, or technology that helps someone to see. This includes people who have different types of sight such as color blindness.
* __Cognitive__: Any condition that affects concentration, memory, judgement, problem solving or logic solving.
* __Mobility__: Any condition that affects bodily movement.
* __Hearing__: Any disabilities related to sound or the technology that helps someone to hear.

## Guidelines

For official guidance, always refer to the [WCAG 2.1 W3C documentation](https://www.w3.org/TR/WCAG21/). You can find failure examples for each WCAG standard, and techniques for fixing them in How to Meet [WCAG (Quick Reference)](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.1&showtechniques=148&currentsidebar=%23col_customize#visual-presentation).

### Checklist

 1. Have you annotated the headings on your feature?
 2. Have you defined the focus/tabbing order on your feature?
 3. Have you added screen reader labels for elements that are not focusable? (Dynamic content changes, images and their alt text)
 4. If this is a new page outside the GitHub monolith, are the landmarks annotated?
 5. Does the text meet color contrast?
 6. Do graphic objects meet color contrast?
 7. With color removed, can you still understand the design?
 8. Can all revealable information (hover card, tooltips, accordions) be accessed with a keyboard or a mouse?
 9. If the user increases the text size to 200%, is the page still usable?
 10. When the screen reduces in size (down to 320px wide), is everything usable without scrolling horizontally? (There are a few exceptions to this rule: check 1.4.10 - Reflow for details)

## Common Patterns

### Alternative Text for Images

Alternative text on images allows assistive technology like screen readers to understand the purpose of an image on a page or allows them to skip it if purely decorative.

### Informative and Decorative Images

To help you determine the best way to communicate the information of an image to a screen reader user, you can use [the alt text decision tree provided by the W3C.](https://www.w3.org/WAI/tutorials/images/decision-tree/_)

Depending the purpose of the images, they can be categorized into one of two categories: [informative](https://www.w3.org/WAI/tutorials/images/informative/) or [decorative](https://www.w3.org/WAI/tutorials/images/decorative/) images.

* __Informative__ images convey a simple concept or information that can be expressed in a short phrase or sentence. The alt text must contain the description of what is displayed visually in the image.
* __Decorative__ images don’t add information to the content of a page. For example, an image that is included to make the website more visually attractive. You will always get an affirmative answer to the question "if the image was removed, would the user still get all the information from the page?".

#### Guidelines

##### For Designers

When you create a new design and it includes images, include captions with a description for each of them. Annotate which images are informative and which ones are decorative.

##### For Engineers

As you're developing use proper semantic HTML and use the `<img>` element with proper alternative text using the alt attribute.

Every `<img>` element must have an alt attribute. It could have content for informative images or be empty for decorative images, but it must always be present.

---

### Assistive Technology Announcements

Events like toasts and status messages are visually communicated to Dusk users. Making sure those announcements are read via assistive technology allows users with low or no vision to get that status information.

#### Overview

These guidelines will help you determine when assistive tools should output a message.

#### Guidelines

- __Always__: Announce location changes — Help users understand where they are on a page. Maintain positional awareness.
- __Always__: Announce results of user actions — Give feedback about the success or failure directly following a user action.
- __Sometimes__: Announce other changes — Explore case-by-case when changes are disconnected from the user’s place and the success or failure of the user’s actions.
For example:

    - Distracting change announcements: When other users add issue comments; when presence indicators appear

    - Essential change announcements: When log lines stream in on the GitHub Actions workflow run page

### Descriptive buttons

Labeling buttons properly let's users know what will happen when they activate the control, lessens errors, and increases confidence.

#### Overview

In order for a button’s purpose to be clear to all users, it must have a meaningful name.

__What is a meaningful name and why it is necessary?__

A meaningful name describes the button’s purpose: the action that occurs when the button is activated (for example: removing a list item), and the action’s associated context (for example: the specific item to be removed). To avoid unnecessary verbosity, button names should be as succinct as possible while still being descriptive and unique.

Clear and consistent labels set user expectations for button actions, giving users confidence that activating a button will have the outcome they expect.

Screen readers (for example: VoiceOver) provide overlays to enable users to jump to specific types of elements, including buttons. Elements are listed by their names. When buttons don’t have meaningful names, it’s not possible to determine which action will be performed when selecting them from the list.

#### Guidelines

##### For Designers

When including an unlabeled, icon-only button in a design, recommend an accessible name.
When including multiple buttons that perform the same function in a design, use the same label for each.

##### For Engineers

When a button doesn’t have a visible label (for example: an IconButton), provide an accessible name. Refer to ARIA 14: Using aria-label to provide an invisible label where a visible label cannot be used.
Because aria-label doesn’t supplement visible labels but rather supplants them, when a button has a visible label, include that label in its accessible name. A good practice is to have the text of the label at the start of the name.
Don’t use aria-label when its content would be identical to a button’s visible label.
Don’t reuse the same (visible) label or (invisible) name for buttons which perform different actions.

### Focus Management

Managing focus within a page or application is essential for users to successfully navigate, complete actions, and understand where they are.

#### Overview

Managing focus within a page or application is essential for users to successfully navigate, complete actions, and understand where they are. A focus indicator is usually seen visually as a blue outline around an interactive element when that element has focus.

#### Why?

Not all users are able to use a mouse to navigate a web page or application. Keyboard-only and screen reader users rely on navigating and using a web page with only a keyboard, so they will be unable to perform certain actions if they cannot navigate to all elements.

To meet [WCAG Guideline 2.1 (Keyboard Accessible)](https://www.w3.org/TR/WCAG21/#keyboard-accessible), all interactive elements need to be accessed and activated by a keyboard alone.

#### How to test Focus Management

To verify proper focus management, try using the feature or page with only a keyboard. Use the Tab key to navigate forward and Shift + Tab to move backwards. Some elements will use the arrow keys for keyboard navigation, such as toolbars and dropdowns.

While using the feature, you should make sure that:

- You can navigate to every interactive element (for example: buttons, form fields, links)
- You see a visual focus indicator for every element (for example: a blue outline)
- The tabbing order is logical based on the page structure and content
- You are not trapped anywhere, and focus is never lost (for example: when deleting a comment, focus is returned to a logical place)
- If you can trigger a new element (for example: a modal), focus is moved to that modal when opened, and returned to the page when closed

#### Guidelines

##### For Designers

In your designs, annotate how the focus should move through various states of a feature, if applicable, for the user. Include where the focus should be when: an item is deleted, an item is added, an action triggers a page refresh, a modal is opened, a modal is closed, etc.

Keep in mind high-contrast mode, dark mode, and light mode. Ensure the focus indicator meets the minimum color contrast ratio.

##### For Engineers

Most interactive elements will have a focus indicator automatically.

For example, if you use a __button__ element, it should automatically receive focus when using a keyboard. If you need to create your own focus indicator, you can do so with the CSS pseudo-class :focus. You may also need to add/remove a class with JavaScript to apply/remove the focus indicator.

A common complaint when using :focus is that when a user clicks on a button, for example, they see the focus indicator which isn't always necessary for a mouse user. This may lead to an engineer removing the outline entirely — never remove the focus indicator unless you are replacing it with a border or some other visual indicator. Using :focus-visible will prevent the focus indicator from being seen for mouse users, but show it for keyboard users.

You may need to programmatically determine where the focus should be when an event happens. For example, when you open a modal, you will need to programmatically move focus to an element inside of it. One way of doing this is by setting document.activeElement to the element you want to have focus.

### Headings

Headings play a critical role in communicating the structure of a page. Find out why they're critical and how to create an accessible hierarchy in your pages.

#### Overview

Headings play a critical role in communicating the structure of a page. Heading levels range from `h1` to `h6`.

Best practices:

- Avoid skipping heading levels. `h1` should be followed by `h2` and so on.
Do not use heading elements solely for resizing text.
- Avoid setting more than one `h1` per page. `h1` should be reserved to describe the page as a whole, similar to a page "title". (Dialog headings are excepted from this rule.)

#### Why?

A correct heading structure is critical for enabling users to navigate quickly within a page. Headings are by far the most common navigation technique for screen reader users. 67.7% of surveyed screen reader users responded that they are first likely to navigate via the headings when trying to find information on a lengthy web page. A proper heading structure also allows sighted users to visually scan and find what they want on a page quickly.

An improper heading structure can cause a confusing navigation experience.

#### Guidelines

##### For Designers

In your designs, annotate the heading level. Properly labeled headings are one of the most important things a designer can do for developer handoff.

##### For Engineers

As you're developing a page, use tools to verify the heading structure. You may also inspect the DOM structure of your page using the browser inspector, but using an extension will surface heading levels more easily.

### Links

Links help us navigate a website. Learn how to style links appropriately to keep them usable by all.

#### Overview

Links are user interface elements that navigate you to a new place or new content. Contrast this with buttons, which are designed to activate a feature.

#### Why?

Links can do things like help with page context, reference similar items of interest, and allow for endless connected information surfing through sites like Wikipedia. Links play a key part in your experience on the web, but without proper consideration they can be frustrating to use, skipped over, or completely unnoticed.

For screen reader assistive technology, links and buttons are expected to function differently from each other. If a link is activated and does not do what was expected, that can be disorienting and frustrating.

A common way a screen reader might navigate the page is by going through a list of all the links on the page. Without context, "read more" or "click here" links are not helpful.

People who have low or colorblind vision may have trouble identifying links that just use color to distinguish them from plain text, this is why keeping the underline styling on links within body text is important for identification.

#### Functionality and Purpose

A link's function is to navigate to a different page or new content. If instead a feature on the page is activated, use a "button".

A link's purpose must be obvious from the link text alone. If you can't get an idea of where a link will take you based on the link text without reading the surrounding text, the link text should be updated.

This is important because screen readers allow users to browse through a list of links, where the link text is the only clue of where a link will take you.

#### Visual Distinction and Contrast

Like normal text, a link must have a 4.5:1 contrast against the background color that it is placed on. Use a [contrast checker](https://webaim.org/resources/contrastchecker/) to validate that your link meets this required contrast.

If a link is surrounded by text, it must be underlined or pass a 3:1 contrast against the surrounding text as well. Alternatively an icon, a background shape or an outline can demarcate a link.

Some examples of this are:

- links within body text
- a headline and sub-line which both are individual links
- issue numbers or usernames within a commit line

#### Guidelines

##### For Designers

- Visually demarcate your links by using:
    - the accent color in combination with default for the surrounding text on any of the canvas.
    - an underline for the link text
    - an icon before or after the link text
    - using a background shape behind the link
    - using a link color that has a 3:1 contrast against the surrounding text color AND a 4.5:1 against the background color
- Make sure a link's purpose can be understood from the link text alone, without needing the surrounding context.
- Links should look like links, not buttons, except in rare circumstances, like calls to action.

##### For Engineers
    - ...
    - ...
    - ...

### Semantic HTML

Understand when and how to use semantic HTML to improve the experience of the largest number of users possible.

#### Overview

Semantic HTML provides meaning to the content of a web page. It involves using the correct HTML element for the job. Semantic HTML breaks the page up into meaningful sections.

#### Why?

Many groups of people benefit from properly used semantic HTML. Using the correct elements allows assistive technology to accurately convey the purpose of the content to the user. Without it, they will not be able to navigate easily. Other benefits of using semantic HTML are SEO and code readability.

#### Guidelines

##### For Designers

In your designs, annotate what HTML elements should be used for various parts of the design, if appropriate. Understand that most designs are achievable with CSS alone, agnostic of the HTML elements used.

##### For Engineers

Think about the content that will populate an element in order to determine what HTML element should be used.

Are you building a navigation? Use the "nav" element instead of nested "div" elements. You may need to add interactivity to more complex elements, such as "dialog". Some elements may require additional ARIA attributes to convey things such as state, but be careful to use these only when necessary.

...

### Text Resizing and Re-spacing

People on the web should be able to resize text to improve legibility without blocking or obscuring any other part of the UI.

#### Overview

Users should be able to resize text and use custom text spacing without text being clipped, truncated, or obscured. In addition, interactive controls should not break.

#### Why?

People with low-vision may rely on the browser's zoom functionality or update the font-size of a page to read content. Additionally, people with low-vision and people with dyslexia may increase text spacing with custom CSS to improve readability.

When sites are built without adequate considerations around responsiveness (for example: setting fixed width and height, using non-relative font sizing), sites may become completely unreadable and unusable for some users.

#### How to test

##### Text resizing

Most modern browsers support full-page zoom, while some also support text-only zoom (for example: Firefox). While WCAG does not specify how text should be resized, it is best practice for your page to be readable with full-page zoom and text-only zoom. Aside from using the browser zoom, some users may also resize text through browser font-size setting.

Test your page by using browser zoom with magnification of up to 200%. Confirm that the text content does not overflow, overlap, or become truncated, and that interactive controls still work.

Learn more about resize testing techniques at TheA11yProject: Resize text.

##### Text spacing

Modify text spacing according to the WCAG text spacing testing guidelines. You can do this by changing the CSS using the browser inspector or by using a tool like Steve Faulkner: text spacing bookmarklet.

Confirm that text is contained within the bounds of its container without overlapping or being cutoff.

#### Guidelines

##### For Designers

When creating a design, ensure that font sizes and element sizes are annotated with proper resizing techniques before handing it off to an engineer. There are a variety of techniques that can be employed to ensure responsive text and space resizing. This includes avoiding setting fixed height on a container to allow text content to expand, and using relative units such as em and rem instead of px.

##### For Engineers

As you're developing a feature, make sure to test the page using the resize techniques described in How to test. Ensure that WCAG Resize text techniques and WCAG Text spacing techniques are employed.

---

### Tooltips

Most UI cases don't call for tooltips. Learn some alternative methods to use in place of tooltips.

#### Overview

Tooltips are often used to convey information. However, tooltips are rarely appropriate, and their misuse can result in a myriad of accessibility issues. Always consider not using a tooltip for an improved user experience.

#### Why?

Tooltips are hidden by default making it easy to miss, so they should never be used to convey critical information.

Tooltips are never accessible on mobile devices.

Tooltips should never be set on non-interactive elements (for example, div, span, p), and should only ever be set on interactive elements (for example, button, a). Tooltips on non-interactive elements are not accessible to keyboard users and screen reader users.

#### Guidelines

##### For Designers

-   Reserve tooltips for components like icon buttons.
-   Keep your tooltip text minimal.
-   Only include tooltips on other components as a last resort.
-   Never include tooltips on non-interactive components (div, span, p).

##### For Developers

If you come across a design or a page with a tooltip on a static element (for example, div, span, p), remove it. Consult a designer for an alternative way of conveying the information.

...

## Resources

### Understanding WCAG 2.1

- [Knowbility.org](https://knowbility.org/search/?q=WCAG+2.1): Search for 'WCAG 2.1' on Knowbility to get a more clear and succinct interpretation of WCAG 2.1's official guidance.
- The [a11yproject](https://www.a11yproject.com/resources/) includes a wealth of resources on web accessibility.

### Pattern libraries

- [WAI-ARIA Authoring Practices 1.2](https://www.w3.org/TR/wai-aria-practices-1.2/) is an in-depth list of UI patterns and how to implement them, from W3C.
- [Inclusive components](https://inclusive-components.design/)
- [a11ymatters patterns](https://www.a11ymatters.com/patterns) includes useful information for developers.

## Tools
...
