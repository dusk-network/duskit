# CSS Architecture

Our CSS architecture is framework-agnostic. It is designed to work seamlessly with component-based ecosystems (like Svelte, React, or Vue) by strictly separating global styling rules from scoped component tokens.

This document defines a scalable CSS architecture based on a Strict Inheritance model. To prevent the spaghetti code decay typical of growing projects, the system enforces a rigorous separation of concerns. The architecture ensures that a token or rule at any given level MUST exclusively consume values from its designated upstream source, keeping the system predictable, accessible, and mathematically testable.

## Preface: The Nature of This Package

Before diving into the architecture, it is important to clarify what `@duskit/css` actually is. Currently, it operates as a hybrid of three elements:

1. **A strict design system:** enforcing mathematical contrast rules and semantic token hierarchies.
2. **An architectural philosophy:** advocating for extreme predictability, isolation of concerns, and engineering rigor in CSS.
3. **A pragmatic CSS framework:** providing drop-in, ready-to-use styles for Dusk applications.

This hybrid state is a pragmatic and temporary choice. The layered architecture outlined in this document is rigorous, necessary, and strictly enforced. However, software engineering in production reality demands immediate utility. Instead of extracting the design system into a separate, abstract entity (e.g., strictly adhering to standalone W3C Design Tokens Community Group formats), we chose to bundle our architectural foundation directly alongside a ready-to-use CSS package.

For a transparent ledger of these structural and packaging choices, see the paragraph about [architectural compromises](#9-architectural-compromises).

## TOC

- [1\. Core Principles](#1-core-principles)
  - [1.1 The Amnesia Heuristic (Structure vs. Payload)](#11-the-amnesia-heuristic-structure-vs-payload)
  - [1.2 Logical-First Properties](#12-logical-first-properties)
  - [1.3 Semantic Abstraction (Cognitive Emphasis)](#13-semantic-abstraction-cognitive-emphasis)
- [2\. The Layered Architecture](#2-the-layered-architecture)
  - [2.1 Layer 0: Primitives](#21-layer-0-primitives)
  - [2.2 Layer 1: Theme](#22-layer-1-theme)
  - [2.3 Layer 2: Base & Reset](#23-layer-2-base--reset)
  - [2.4 Layer 3: Component Categories (The Component API)](#24-layer-3-component-categories-the-component-api)
    - [2.4.1 Strict Taxonomy and Property Sovereignty](#241-strict-taxonomy-and-property-sovereignty)
    - [2.4.2 Density over T-Shirt Sizes](#242-density-over-t-shirt-sizes)
  - [2.5 Layer 4: Utilities](#25-layer-4-utilities)
- [3\. The Contract Boundary](#3-the-contract-boundary)
  - [3.1 The Semantic Pipeline and the Prism Analogy](#31-the-semantic-pipeline-and-the-prism-analogy)
  - [3.2 Domain Pollution vs. Composition over Mirroring](#32-domain-pollution-vs-composition-over-mirroring)
  - [3.3 Roles, Sovereignty, and the Contract Definition](#33-roles-sovereignty-and-the-contract-definition)
    - [3.3.1 The Missing Contract Protocol](#331-the-missing-contract-protocol)
  - [3.4 Mathematical Validation](#34-mathematical-validation)
  - [3.5 Systemic Resilience](#35-systemic-resilience)
- [4\. Dimensional & Spatial Physics](#4-dimensional--spatial-physics)
  - [4.1 Intent-Driven Unit Selection](#41-intent-driven-unit-selection)
  - [4.2 The Hardware Boundary (Physical Pixels)](#42-the-hardware-boundary-physical-pixels)
  - [4.3 The Border Compromise](#43-the-border-compromise)
  - [4.4 Dimensional Scales & Taxonomy (Layer 0)](#44-dimensional-scales--taxonomy-layer-0)
- [5\. Environment Physics & Ergonomics](#5-environment-physics--ergonomics)
  - [5.1 The Luminance Environment (Light vs. Dark Physics)](#51-the-luminance-environment-light-vs-dark-physics)
  - [5.2 Interaction Physics](#52-interaction-physics)
  - [5.3 Topography of Surfaces (The Layering Rules)](#53-topography-of-surfaces-the-layering-rules)
  - [5.4 Visual Affordance and Cursor Semantics](#54-visual-affordance-and-cursor-semantics)
    - [5.4.1 The Link Rule (Cursor Pointer)](#541-the-link-rule-cursor-pointer)
    - [5.4.2 Avoiding False Affordance (Honesty in Feedback)](#542-avoiding-false-affordance-honesty-in-feedback)
    - [5.4.3 Contextual Tools vs. Static Identity](#543-contextual-tools-vs-static-identity)
  - [5.5 Feedback Ergonomics (Passive Context vs. Active State)](#55-feedback-ergonomics-passive-context-vs-active-state)
    - [5.5.1 Passive Overlays (Tooltips)](#551-passive-overlays-tooltips)
    - [5.5.2 Active Feedback (Toasts and Notifications)](#552-active-feedback-toasts-and-notifications)
  - [5.6 The 3D Topography (Viewport Orchestration)](#56-the-3d-topography-viewport-orchestration)
- [6\. Component Anatomy & Conventions](#6-component-anatomy--conventions)
  - [6.1 Spatial Sovereignty (Intrinsic vs. Extrinsic Space)](#61-spatial-sovereignty-intrinsic-vs-extrinsic-space)
  - [6.2 Dimensional Independence (The Size Prop)](#62-dimensional-independence-the-size-prop)
  - [6.3 State Encapsulation (Private Tokens)](#63-state-encapsulation-private-tokens)
  - [6.4 Touch Targets and Interactive Ergonomics](#64-touch-targets-and-interactive-ergonomics)
  - [6.5 Shared Anatomy vs. Semantic Species](#65-shared-anatomy-vs-semantic-species)
- [7\. Future Scope & Roadmap](#7-future-scope--roadmap)
- [8\. Technical Limitations](#8-technical-limitations)
- [9\. Architectural Compromises](#9-architectural-compromises)
  - [9.1 The Token Coupling Debt](#91-the-token-coupling-debt)
  - [9.2 The Legacy of @duskit/design-tokens](#92-the-legacy-of-duskitdesign-tokens)

## 1. Core Principles

### 1.1 The Amnesia Heuristic (Structure vs. Payload)

The most common cause of CSS technical debt is the entanglement of spatial layout with visual styling (e.g., a button that dictates its own external margin, or a layout grid tied to a specific semantic context). To keep the system scalable and infinitely composable, every token, CSS class, or component must have a single, unambiguous responsibility.

When evaluating system architecture, categorizing components, or defining domain boundaries, the system autonomously applies the "Amnesia Heuristic" to rigorously separate structure from content.

To determine an element's true architectural role, and thus correctly assign it to the appropriate CSS layer, mentally strip away its "payload" (specific data, context, or obvious meaning):

- **It is Structure (The Container):** If the remaining skeleton still serves a logical, organizational, or routing function independent of context. It governs the space, time, or flow of _any_ information (e.g., a generic layout component, a grid system, a base spatial token).
- **It is Content (The Payload):** If the element, deprived of its specific meaning, collapses and loses all purpose. It exists _exclusively_ to represent that precise data or concept (e.g., a specific business rule, a contextual icon, a semantic brand color).

This heuristic is the foundation of our CSS separation of concerns: structural layout mechanisms must never dictate semantic meaning, and semantic content must never enforce spatial constraints.

### 1.2 Logical-First Properties

We default to **Logical Flow** (`block`, `inline`, `start`, `end`) for all standard UI components, typography, and layout geometry.

- **Rationale (Future-Proofing):** Physical properties bind the design to the rigid hardware of the screen. Logical properties bind it to the fluid flow of the content. Business requirements inevitably mutate; adopting logical properties acts as a zero-cost insurance policy. It guarantees that when an application needs to support RTL (Right-to-Left) languages, the UI mirrors itself automatically, completely eliminating the need for massive, error-prone future refactoring of spatial coordinates.

- **Cognitive Alignment:** Modern layout engines like Flexbox and CSS Grid operate exclusively on logical axes (`justify-content`, `align-items`). Adopting logical properties for margins, paddings, dimensions, and borders unifies the system's vocabulary and prevents hybrid, brittle layouts.

**The Hardware Exception (Physical Properties):**
Physical coordinates (`top`, `bottom`, `left`, `right`, `width`, `height`) are not permanently abandoned, but their use is strictly quarantined. They must be used _only_ when an element intentionally ignores the document flow to anchor itself to the physical screen hardware or a specific media container.
Valid use cases for physical properties include:

- **Absolute Media Anchors:** Elements pinned to fixed physical corners of a media container regardless of language direction (e.g., a "REC" indicator pinned to the `top` and `right` of a `<video>`).
- **Canvas & Rendering Coordinates:** Elements relying on the physical pixel matrix of the screen (e.g., bounding box calculations, `<canvas>` elements, or absolute drag-and-drop interactions).
- **Viewport Overlays:** System-level debug tools or overlays that must strictly cover the physical viewport regardless of the underlying content orientation.

### 1.3 Semantic Abstraction (Cognitive Emphasis)

The naming convention for tokens must prioritize the cognitive weight of an element over its literal appearance. We reject modifiers like `-light` or `-dark` because they describe a static state that fails when the luminance environment changes.

- **Intent-Based Scaling:** Tokens use modifiers like `-subtle` and `-strong` to define the perceptual prominence of the information.
  - **Subtle:** Indicates low emphasis. In a light environment, this maps to a pale tint; in a dark environment, it maps to a deep, muted shade.
  - **Strong:** Indicates high emphasis. It ensures the element visually prioritizes itself relative to its surroundings.
- **Theme Agnosticism:** By naming tokens based on their role in the information hierarchy, the same CSS logic remains valid across all environments. A component preserves its semantic continuity regardless of whether the root background is white or black.

<p align="right"><a href="#toc">[back to TOC]</a></p>

## 2. The Layered Architecture

> **Terminology Notice: Architectural Layers vs. CSS Cascade Layers**
>
> In this document, the term "Layer" (0 through 4) refers exclusively to the abstract architectural boundaries governing taxonomy, semantic abstraction, and the dependency graph. It must not be confused with the native CSS Cascade Layers (`@layer`) feature, which operates strictly on runtime selector specificity.

The layered architecture is the physical materialization of the core principles defined in Chapter 1. It enforces the separation of concerns and the Amnesia Heuristic not through developer discipline, but through a strict structural hierarchy.

The numbering (Layer 0 to Layer 4) establishes a rigid dependency graph and the logical flow of data from raw physical values to specific UI implementations. It does not dictate CSS selector specificity, but strictly governs the level of semantic abstraction and determines which layer is authorized to consume tokens from another.

### 2.1 Layer 0: Primitives

This layer outputs only CSS variables (`:root`) and does not generate any visible CSS rules. It contains raw physical values like hex codes, dimensional `rem`s, and absolute math. These tokens are structurally agnostic and carry no semantic meaning.

### 2.2 Layer 1: Theme

This layer outputs only CSS variables. It acts as the single source of truth by assigning semantic meaning to Layer 0 primitives (e.g., mapping a raw color to `--action-primary-color`). All subsequent layers safely consume tokens from this layer.

### 2.3 Layer 2: Base & Reset

This layer outputs actual CSS rules that affect the document, consuming variables strictly from Layer 1. These are low-specificity rules that normalize browser defaults and style naked HTML tags (`body`, `h1`, `a`) before any component logic is applied.

### 2.4 Layer 3: Component Categories (The Component API)

This layer defines the **API Contract** for UI components, consuming variables strictly from Layer 1. To prevent overlapping responsibilities, tokens are organized into five strict domains:

- **Interactive:** Controls that receive user input (Buttons, Forms, Toggles).
- **Display:** Elements for passive data presentation (Typography, Avatars, Badges).
- **Feedback:** Communication of system status (Alerts, Toasts, Skeletons).
- **Layout:** Structural, invisible primitives (Stacks, Grids, Spacers).
- **Viewport:** Universal infrastructure tokens orchestrating the three-dimensional stacking context (z-axis) and environmental constants. These tokens define the abstract spatial planes shared across all architectural layers, keeping the core infrastructure strictly separated from specific component payloads.

Component authors will use tokens exclusively from this layer.

#### 2.4.1 Strict Taxonomy and Property Sovereignty

Tokens follow a rigorous naming convention: `[domain]-[category]-[role]-[modifier]-[property]`.
The golden rule of the system is **Property Sovereignty**: every token MUST end with the CSS property type it represents (e.g., `-color`, `-size`, `-width`, `-gap`). Interaction states or variants are modifiers, not data types. Therefore, the correct token is `--interactive-action-primary-bg-hover-color`, never `--interactive-action-primary-bg-color-hover`.

#### 2.4.2 Density over T-Shirt Sizes

We reject relative "T-shirt" sizing (`-sm`, `-md`, `-lg`) in component anatomy. Physical metrics must reflect spatial intent and layout density. We use `-compact` (for high-density interfaces or mobile-first layouts) and `-standard` (for general-purpose UI). What is "small" to one developer might be "medium" to another, but "compact" describes a precise mechanical behavior.

### 2.5 Layer 4: Utilities

This layer is strictly quarantined and intentionally kept minimal. It contains only single-purpose functional classes that must transcend component boundaries. It's currently limited to essential accessibility behaviors (e.g., `.sr-only`).

Any addition to this layer must pass a strict architectural test: utility classes must govern invisible behavior or pure structural flow. They are forbidden from carrying any visual payload (such as colors, typographic overrides, or hardcoded margins). If a UI element requires a visual override, the solution must be engineered within the Layer 3 component API, never patched here.

<p align="right"><a href="#toc">[back to TOC]</a></p>

## 3. The Contract Boundary

Most design systems inevitably degrade into a tangled mess of overrides because they couple component CSS directly to global theme tokens. If a `.button` directly consumes `var(--action-primary-color)`, the architecture shatters the moment a dark mode is introduced, or when a specific contextual container requires that button to have a different contrast ratio.

To prevent this, our architecture strictly prohibits components from directly accessing Layer 1. Instead, we introduce Layer 3 as an impenetrable boundary between the theme and the UI.

### 3.1 The Semantic Pipeline and the Prism Analogy

Data flows through the system in a strict, unidirectional pipeline:

- **Layer 0 (The Raw Material):** Provides the physical coordinates (raw hex codes, mathematical values).
- **Layer 1 (The Semantic Intent):** Transforms raw materials into abstract meaning (e.g., mapping a hex to `--surface-embedded-color`).
- **Layer 3 (The Prism):** Acts as a refractor. It takes a _single_ semantic intent from Layer 1 and splinters it into the anatomy of dozens of components (a 1-to-N mapping). For instance, the single `--surface-embedded-color` token feeds the background of a text input (`--interactive-field-bg-color`), the track of a toggle switch (`--interactive-toggle-track-bg-color`), and the alternating rows of a data table (`--display-table-row-striped-bg-color`).

In this architecture, Layer 3 operates exactly like an `Interface` in Object-Oriented Programming. It merely dictates a contract. Layer 1 defines the global semantic vocabulary (the implementation) but remains completely ignorant of components. Layer 3 declares that a specific category of components requires a specific property. Finally, the component's CSS blindly consumes the Layer 3 contract, trusting that it will provide the correct value for its current state and environment, without ever needing to know _what_ the global color actually is.

### 3.2 Domain Pollution vs. Composition over Mirroring

Understanding the boundary between Layer 1 and Layer 3 requires distinguishing between two common architectural pitfalls:

- **Domain Pollution:** Layer 1 dictates Semantic Intent, while Layer 3 dictates Component Anatomy. Layer 1 must never contain component-specific references. If Layer 1 defines a token like `--button-primary-bg-color`, the domain is polluted. The theme should only care about what a color _means_, not where it is applied.
- **Composition over Mirroring:** While occasional 1:1 mappings are necessary for universal structural constants (such as global z-indexes in `viewport.css`), Layer 3 is NOT a simple pass-through. A healthy architecture naturally translates a single semantic intent (Layer 1) into "N" distinct anatomical applications (Layer 3), prioritizing structural composition over mere 1:1 mirroring.

### 3.3 Roles, Sovereignty, and the Contract Definition

This boundary naturally divides the engineering workflow into isolated domains, ensuring that different teams (or the same developer at different times) can work without causing systemic regressions. However, because Layer 3 acts as the bridge between these domains, its definition requires strict collaboration.

- **Theme Authors (Layer 1):** Responsible for the global visual language, brand identity, and mathematical contrast ratios. They operate exclusively within Layer 1. They are strictly forbidden from writing component-specific CSS.
- **Component Authors (UI Engineers):** Responsible for the anatomy, accessibility, and logical flow of the interface. They build the UI by exclusively consuming Layer 3 contracts. They never hardcode values and never touch Layer 1.
- **The Contract Negotiation (Layer 3):** Layer 3 is defined collaboratively. The Theme Author and the UI Engineer identify the required anatomical tokens for a new component category, and the Theme Author assigns the correct semantic Layer 1 values to those tokens.

#### 3.3.1 The Missing Contract Protocol

When a Component Author realizes a required Layer 3 token does not exist, they must never bypass the system by hardcoding physical values or pulling directly from Layer 1. Instead, they should follow a strict protocol depending on their environment:

- **Internal Development (`@duskit/components`):**
  If the developer is writing a component directly within the monorepo, they should propose the new Layer 3 contract within their Pull Request. This PR must explicitly modify the `@duskit/css` package to include the new token, allowing the Theme Author to review and assign the appropriate Layer 1 intent.

- **External Development (Consumer Applications):**
  If the developer is building a custom component in an external application consuming the Dusk framework, they should not block their workflow, nor should they break encapsulation by mapping Layer 1 directly to their component's internal private variables. Instead, they should create a **temporary, local Layer 3 contract** in the application's root stylesheet:

  ```css
  /* Application's Root CSS (Temporary Local Layer 3) */
  :root {
    --app-interactive-special-bg-color: var(--surface-color);
  }
  ```

  Simultaneously, the developer is encouraged to open a Pull Request in the `@duskit/css` repository to propose the new token for global standardization. This ensures the framework evolves organically based on real application needs, while keeping the local component safely decoupled.

### 3.4 Mathematical Validation

Isolating semantic intent in Layer 1 is not merely a stylistic convention; it is the fundamental prerequisite for automated accessibility testing. Because Layer 1 is a pure dictionary decoupled from the DOM, it can be mathematically validated in isolation before a single component is ever rendered.

Our test suite (`theme.spec.js`) acts as the architectural gatekeeper, employing a tri-algorithm approach to enforce contrast rules based on the token's structural role:

- **WCAG 2.1 (Relative Luminance):** Strictly enforced for text readability (ensuring a 4.5:1 ratio for `--on-*` typography tokens) and legal interactive boundaries like focus rings (3:1).
- **Lstar / Delta L\* (Perceptual Lightness):** Used to calculate the topographic elevation and perceptible hierarchy between structural surfaces and neutral containers, measuring distances in Design System Units (DSU).
- **DeltaE2000 (Chromatic Distance):** Used for cases like active status tokens (error, info, success, warning) to validate their semantic recognizability as visual alerts in the 3D color space, avoiding the "paradox of yellow" caused by luminance-only checks.

No contract passes to Layer 3 unless it satisfies these rigorous physical guarantees.

### 3.5 Systemic Resilience

The true power of this separation of concerns is revealed when the system undergoes massive design shifts. Because of the Layer 3 boundary, structural shocks are absorbed at the exact point of impact, leaving the rest of the system and, most importantly, the component's CSS file completely untouched.

**Scenario A: The Brand Mutates**
_The design team decides the primary brand color must change from Blue to Red._

- **Action:** The Theme Author updates Layer 1 (`--action-primary-color` now points to Red).
- **Impact:** Layer 3 is untouched (it still points to the semantic action color). The Component CSS is untouched. The entire system updates instantly.

**Scenario B: The Structural Intent Mutates**
_The design team decides that primary buttons should no longer have a solid background, but must instead be outlined (transparent background, colored text)._

- **Action:** The Theme Author updates the Layer 3 contract (`--interactive-action-primary-bg-color` is reassigned to `transparent`).
- **Impact:** Layer 1 is untouched (the brand's primary color remains valid for other uses). The Component CSS is untouched (it still blindly consumes the background token, which now safely resolves to transparent).

By treating Layer 3 as an independent structural contract, the component itself remains entirely agnostic to both visual design and global intent, achieving true encapsulation.

<p align="right"><a href="#toc">[back to TOC]</a></p>

## 4. Dimensional & Spatial Physics

This system rejects arbitrary unit selection. The choice between `rem`, `em`, and `px` is strictly dictated by the behavioral intent of the property, ensuring the interface scales predictably across devices and user accessibility preferences.

### 4.1 Intent-Driven Unit Selection

- **The Global Standard (`rem`):** The `rem` is the default unit for spatial geometry (grids, margins, paddings, gaps) and base typography. It ensures the interface scales harmoniously with the user's browser-level font settings, maintaining the intended structural proportions globally.
- **The Localized Multiplier (`em`):** The `em` unit is permitted exclusively for internal proportional anatomy. It must only be used when an element (such as an inline icon or internal component spacing) must scale dynamically relative to its immediate parent's font size. It is explicitly quarantined from macro-layout properties to prevent unpredictable compounding inheritance (the matryoshka effect).

### 4.2 The Hardware Boundary (Physical Pixels)

Fluidity must yield to hardware reality when absolute rendering precision is required. We use physical pixels (`px`) strictly to bypass the browser's fluid layout engine and communicate directly with the screen's hardware grid.

Physical pixels are mandatory for:

- **Shadows & Filters:** `box-shadow` blur and spread values require exact pixel precision to render realistic depth without subpixel rendering artifacts.
- **Spatial Transformations:** `transform: translate()` operations must use pixels to prevent the stuttering, jitter, and temporary blurring that occurs during hardware-accelerated animations when elements are forced to rest on fractional subpixels.
- **Bitmap & Vector Rendering:** Internal coordinate systems for `<canvas>` elements and fine stroke adjustments (`stroke-width`) in SVGs rely on strict physical pixel alignment to maintain visual fidelity.

### 4.3 The Border Compromise

Currently, component borders and internal micro-offsets within the base system are governed by fractional `rem` values. This is an intentional architectural compromise.

By maintaining borders in `rem`, we ensure that the entire component anatomy (including its boundaries) maintains strict mathematical proportionality when the UI is scaled via user zoom preferences.
**The known limitation:** Browser layout engines converting fractional `rem` values into physical pixels can produce subpixel anti-aliasing artifacts. On low-density displays or at specific zoom intervals, this can result in blurred lines or the temporary visual disappearance of a 1px border. System consumers who prioritize absolute pixel-perfection over proportional scaling are free to override these specific Layer 1 border contracts with physical `px` values.

### 4.4 Dimensional Scales & Taxonomy (Layer 0)

To prevent the collapse of layout integrity, primitive dimensions (`sizes.css`) are segregated into four distinct scales based on their architectural purpose. Unifying typography and layout into a single scale is a structural flaw; separating them ensures that future typographic updates (such as introducing fluid typography via `clamp()`) can be implemented without accidentally mutating the structural layout grid.

- **Macro Scale (`--size-*`):** A rigid 4-point geometric progression. Used exclusively for structural layouts, grid gaps, margins, paddings, and large border radii.
- **Optical Scale (`--size-optical-*`):** A non-linear scale featuring specific optical steps calibrated for human visual perception. Used strictly for typography (font sizes and line heights) to ensure maximum legibility. Never apply optical steps to layout dimensions.
- **Micro Scale (`--size-micro-*`):** A linear progression of fractional `rem` values dedicated to fine component anatomy, such as borders and internal micro-offsets, accepting the subpixel rendering compromise discussed above.
- **Physical Scale (`--size-px-*`):** Absolute pixel values reserved entirely for the hardware rendering exceptions detailed in [section 4.2](#42-the-hardware-boundary-physical-pixels).

<p align="right"><a href="#toc">[back to TOC]</a></p>

## 5. Environment Physics & Ergonomics

Interaction logic and color selection must account for human visual perception across different luminance environments and physical input methods to ensure long-term comfort and prevent perceptual fatigue.

### 5.1 The Luminance Environment (Light vs. Dark Physics)

Achieving a 4.5:1 WCAG contrast ratio is a necessary compliance requirement, but it is fundamentally insufficient for a professional, comfortable interface. Dark environments are not simple mathematical inversions of light environments; they follow distinct rules of human perception.

- **Optical Vibration (Halation):** Placing highly saturated colors directly against dark backgrounds causes halation: a visual bleed where colored light leaks into the dark surrounding area. This creates a vibrating glow, reducing visual comfort and increasing perceived glare.
- **Saturation Management:** Dark environments require desaturated, softer tones. The architecture rejects automated mathematical inversions because they inherently violate perceptual ergonomics by producing over-saturated results on dark canvases.
- **The Failure of Mathematical Inversion:** Consider a "subtle" error background.
  - In a light environment, this is a pale, low-saturation pink designed to offer a soft warning.
  - An _automated inversion_ would produce a highly saturated, vibrant magenta. When placed on a dark background, this color causes halation and visual noise, effectively transforming a "subtle" hint into an unintentionally aggressive visual anchor.
  - **Semantic Remapping** (done exclusively in Layer 1) instead translates that pale pink into a deep, low-luminance crimson. This maintains the "low emphasis" cognitive role and preserves the information hierarchy without causing optical fatigue.

### 5.2 Interaction Physics

Interactive states must adapt to the underlying canvas luminance rather than relying on fixed mathematical shifts. They follow distinct rules depending on the physical nature of the UI element.

- **Surfaces (Buttons, Cards, Tracks):** Elements with perceived mass must adapt to the underlying canvas luminance to simulate physical interaction.
  - In a **light environment**, an interactive surface must **darken** (decrease luminance) to establish a clear active state against a high-luminance background.
  - In a **dark environment**, a surface must **lighten** (increase luminance) to visibly emerge from the low-luminance canvas.
- **Typography (Links, Text, Icons):** Text is two-dimensional "ink" without mass. It does not simulate depth or volume. Therefore, typographical interaction is not bound by surface physics. Affordance can be freely driven by geometric changes (e.g., underline offset, thickness) or semantic color shifts, provided the 4.5:1 WCAG contrast ratio is strictly maintained in all states.

### 5.3 Topography of Surfaces (The Layering Rules)

To maintain a scalable hierarchy without multiplying surface tokens, the system defines a clear "geological" stratification of the interface. This topography ensures that components always have the correct visual relationship with their container.

- **The Void (Page Background):** The canvas outside the main application container (`--page-background-color`). It provides a neutral frame for the application.
- **The Canvas (Background):** The base color of the application's root container (`--background-color`). This is the starting point for all UI elements.
- **The Alternating Surfaces (Surface & Layer):** Used to create visual depth through nesting without requiring an infinite palette.
  - **Surface:** The primary container color.
  - **Layer:** A subtle variation used for nested blocks (e.g., a card inside a panel).
  - _The Rule:_ Developers alternate between `surface` and `layer` to distinguish nesting levels, ensuring hierarchy through contrast rather than shadows or borders.
- **The Embedded Space (Surface Embedded):** Represents a perceptually separated zone nested within a parent surface.
  - _Intent:_ Reserved for embedded tracks, input regions, and isolated structural areas (e.g., text fields, toggle/meter tracks, alternating rows) that must remain perceptually distinct from their surroundings.
  - _UX Affordance:_ Signals that the area contains isolated data, stateful content, or is intended to receive user input, relying on structural contrast rather than dictating a specific physical z-axis direction.

> **Implementation pattern:** Components that act as containers (e.g., Cards, Panels) should expose a `variant` property to toggle between these surfaces. For instance, a default card uses `variant="surface"`, while a card nested inside a surface-colored panel would use `variant="layer"`. This ensures visual separation through consistent alternation.

### 5.4 Visual Affordance and Cursor Semantics

Visual feedback is a promise of interactivity. Creating an interaction cue for a non-interactive element is a "false affordance" that creates cognitive friction and erodes user trust in the interface.

#### 5.4.1 The Link Rule (Cursor Pointer)

The use of `cursor: pointer` (the "hand" cursor) is strictly forbidden for buttons, tabs, segmented controls, form inputs, or any UI element that is not a native HTML text hyperlink navigating to a different URL.

- **The Native Default:** By W3C specification, native HTML `<button>` elements display the standard arrow cursor. The pointer cursor was designed exclusively to identify web links within bodies of text.
- **Visual Affordance over Cursors:** Interactivity must be communicated through the component's anatomy (shape, padding, borders, color contrast) and state changes (hover, focus, active backgrounds), not by relying on mouse cursor changes. If an element does not look clickable until the user hovers over it, the UI design is fundamentally flawed.
- **The Mobile Reality Check:** The argument that a hand cursor "helps users know where to click" has always been fundamentally flawed. The dominance of touch devices simply exposes this fallacy: billions of users navigate interfaces daily without a cursor in sight. They know exactly where to tap because well-designed elements possess inherent visual affordance. Relying on a hover-based cursor change is merely a desktop crutch to mask poor UI design.
- **OS Guidelines vs. Web Habits:** Native operating systems (macOS, Windows) strictly adhere to this rule. Native desktop applications never change the arrow to a hand when hovering over toolbars, dialog buttons, or system tabs. The pervasive use of `cursor: pointer` on web buttons is a legacy bad habit perpetuated by web developers and Electron-like wrappers, not a legitimate UX standard. "Everyone does it" is an unacceptable justification for breaking platform consistency.

#### 5.4.2 Avoiding False Affordance (Honesty in Feedback)

Visual feedback is a promise of interactivity. Creating an interaction cue for a non-interactive element is a "false affordance" that creates cognitive friction and erodes user trust in the interface.

- **The Hover Lie:** Implementing `:hover` effects (such as background highlights, scaling, or shadow changes) on elements that do not react to clicks is strictly forbidden. A common architectural sin is adding "eye candy" effects to descriptive cards or informational blocks just for aesthetic flair. If the card cannot be clicked, it must not react to the mouse.
- **Compounding the Error:** Adding a `cursor: pointer` to these non-actionable "cool" effects adds insult to injury, explicitly lying to the user about the element's function. In this system, visual flair never overrides functional honesty.
- **Passive vs. Active Cues:** Visual aids intended solely for readability (e.g., Zebra Striping or alternating row colors) must remain passive. They should improve data scanning without mimicking the behavior of interactive controls.
- **Interaction Consistency:** If an element changes its state upon hover, it MUST provide a meaningful outcome when clicked. If no action is available, the element must remain visually static during user proximity.

#### 5.4.3 Contextual Tools vs. Static Identity

While cursors must never be used to compensate for poor static affordance (e.g., using `pointer` on a button), they remain essential when representing specific native interaction tools.

- **Cursors as Tools, Not Labels:** Changing the cursor on hover is legitimate and necessary only when the pointer physically transforms into a specific interaction tool. It must never act as a lazy substitute for a visual state (like "clickable" or "disabled").
- **Valid Contextual Tools:**
  - **Resizing:** `col-resize` or `row-resize` on splitters, resizable panes, and window edges.
  - **Spatial Manipulation:** `grab` (on hover) and `grabbing` (on active click) for draggable areas.
  - **Text Selection:** `text` (the I-beam) on native text inputs and selectable content.
  - **Operation Feedback:** `not-allowed` to indicate an invalid drop target during an active, continuous operation (like drag-and-drop).
- **The Golden Rule:** If the cursor change describes _how_ the user can physically manipulate the space (pull, grab, select), it is correct. If it merely tries to announce a static state ("I am a button" or "I am disabled"), it is a false affordance and an architectural failure.

### 5.5 Feedback Ergonomics (Passive Context vs. Active State)

The system distinguishes between passive information and active system feedback. This psychological distinction dictates their visual behavior and color logic.

#### 5.5.1 Passive Overlays (Tooltips)

Tooltips provide ephemeral, passive context. They must remain **strictly neutral** and never adopt semantic state colors (error, success).

- **Visual Strategy (Surface Inversion):** Since they are informational, they must rely on pure contrast (luminance distance) to "break" the surface flow, without introducing false semantic urgency.
- **Anatomy:** They consume specific Layer 3 tokens (e.g., from the `display` category) which act as the mandatory bridge to Layer 1's inverse tokens.

```css
/* Tooltip Anatomy Example */
.tooltip {
  color: var(--display-tooltip-text-color);
  background-color: var(--display-tooltip-bg-color);
}
```

#### 5.5.2 Active Feedback (Toasts and Notifications)

Toasts and Notifications communicate the status of system operations or user actions (e.g., a failed save or a successful upload). Unlike tooltips, they **must** utilize semantic state variations.

- **Visual Strategy:** State Branding. Their purpose is to signal an outcome. The use of color is essential here to provide immediate cognitive feedback on the nature of the system event.
- **Anatomy:** They consume specific Layer 3 feedback tokens corresponding to their state (e.g., `error`, `info`, `success`, `warning`).

```css
/* Toast Anatomy Example */
.toast--error {
  background-color: var(--feedback-surface-solid-error-bg-color);
  color: var(--feedback-surface-solid-error-text-color);
}
```

### 5.6 The 3D Topography (Viewport Orchestration)

Managing the Z-axis is notoriously one of the most fragile aspects of CSS architecture due to the unpredictable nature of local stacking contexts.

- **The Native Priority (Top Layer):** Whenever structurally possible, component authors should utilize modern native APIs (such as the `<dialog>` element or the `popover` attribute) for modals and dropdowns. The browser extracts these elements into a hardware "Top Layer", making them immune to `z-index` wars and `overflow: hidden` traps created by local parent containers.
- **The Viewport Tokens Fallback:** When native APIs are insufficient, such as when a component requires complex JavaScript spatial calculations (e.g. a Tooltip avoiding screen collisions), or for structurally anchored elements (e.g. sticky headers), the component must exclusively consume tokens from the `viewport.css` Layer 3 domain (e.g. `var(--viewport-plane-anchored)`).
- **The Illusion of Z-Index:** System consumers must understand that `viewport.css` tokens are not magic hammers that can pierce the DOM. They are a standardized vocabulary meant to orchestrate elements safely at the root level (portals) or to provide mathematically consistent safe distances within local contexts, eliminating the use of arbitrary `9999` values.

<p align="right"><a href="#toc">[back to TOC]</a></p>

## 6. Component Anatomy & Conventions

While previous chapters govern the global environment and token propagation, this chapter defines the strict engineering rules for constructing individual components. A component must be robust, entirely encapsulated, and infinitely composable without causing layout regressions.

### 6.1 Spatial Sovereignty (Intrinsic vs. Extrinsic Space)

The golden rule of component composability relies on the strict boundary between **Intrinsic** and **Extrinsic** space. A component is the supreme ruler of its intrinsic space (paddings, internal gaps, intrinsic dimensions), but it must never attempt to govern its extrinsic environment.

- **The "No Margin" Rule:** The root selector of a component (e.g., `.dusk-button`, `.dusk-card`) must never contain `margin` properties or rely on absolute positioning relative to the document flow. If a component carries an external margin, it breaks composability and dictates layout to its parent container.
- **Delegating Extrinsic Space:** Spacing between components is exclusively the responsibility of structural Layout components (e.g., `Stack`, `Grid`) using the `gap` property. A button does not decide how far away it sits from another button; the container holding them decides.

### 6.2 Dimensional Independence (The Size Prop)

When a component exposes physical size variations (e.g., mapping to the `compact` or `standard` density tokens defined in Layer 3), these variations must exclusively mutate structural tokens (paddings, gaps, font sizes, and `min-block-size`).

- **Zero Color Duplication:** Color, surface, and interactive state tokens must remain absolutely agnostic to the component's physical dimensions. You must never create redundant tokens like `--button-primary-compact-bg-color`. A compact primary button is assembled using the exact same Layer 3 color tokens as the standard one; only its spatial recipe changes.

### 6.3 State Encapsulation (Private Tokens)

To manage internal component states (`:hover`, `:active`, `[aria-disabled="true"]`) without creating a brittle nightmare of nested CSS selectors and escalating specificity, component authors are encouraged to use the **Private Custom Property pattern**.

- **The `--_` Convention:** Components map their external Layer 3 contracts to internal private tokens (prefixed with `--_`). The main CSS block strictly consumes these private tokens.
- **State Reassignment:** When a state changes, the CSS does not redeclare properties; it simply reassigns the private token value. This keeps the CSS declarative and flat.

```css
/* Good: Flat specificity and declarative mapping */
.dusk-button {
  /* Mapping Layer 3 to Private Tokens */
  --_btn-bg: var(--interactive-action-primary-bg-color);
  background-color: var(--_btn-bg);
}

.dusk-button:hover {
  /* Only mutating the variable, not the property */
  --_btn-bg: var(--interactive-action-primary-hover-bg-color);
}
```

**The Advantage:** By reassigning the variable rather than redeclaring the CSS property (`background-color: ...`), the browser automatically recalculates the style. This keeps the state logic incredibly clean, avoids specificity wars, and makes complex components vastly easier to read and maintain.

### 6.4 Touch Targets and Interactive Ergonomics

Regardless of how visually small a component appears (e.g., a minimal "close" icon or a tiny pagination dot), its invisible interactive area must respect physical accessibility standards.

- **Decoupling Visuals from Ergonomics:** Use `min-block-size` and `min-inline-size`, mapped to the appropriate semantic density tokens (e.g., `--interactive-control-standard-min-block-size: var(--density-target-md)`), to ensure a ~44px/48px physical footprint on the root interactive element. The visual footprint of the component is then managed internally (e.g., using flexbox alignment for the icon). The physical hit area must never be compromised for aesthetic reasons.

### 6.5 Shared Anatomy vs. Semantic Species

Components with entirely different semantic purposes often share identical structural anatomy. The system prevents CSS duplication by allowing distinct semantic components to consume the same internal architectural blueprint.

For example, a `Primary Button` and a `Dropdown Trigger` might be visually identical. Instead of duplicating the button's CSS logic, the `Dropdown Trigger` should consume the underlying anatomical structure of a standard button, simply re-exposing it under a different semantic API (a distinct component) to guarantee its specific accessibility attributes (`aria-haspopup`, `aria-expanded`). CSS classes define the _structure_; the framework component defines the _intent_.

- **Shared Anatomy:** Universal physical metrics shared across a domain (e.g., `--interactive-control-standard-gap`, `--interactive-control-standard-min-block-size`).
- **Semantic Species:** Specific color and state logic for distinct UI behaviors (e.g., `--interactive-action-*` for execution buttons, `--interactive-field-*` for text inputs, `--interactive-toggle-*` for checkboxes and switches).

<p align="right"><a href="#toc">[back to TOC]</a></p>

## 7. Future Scope & Roadmap

The current architecture establishes a solid foundation for semantic tokens, topological hierarchies, and mathematical contrast validation. The following architectural areas are explicitly deferred to future iterations:

- **Color Vision Deficiency (CVD) Validation:** Extending the contrast suite to simulate Protanopia, Deuteranopia, and Tritanopia. This will ensure that our DeltaE2000 and Lstar algorithms maintain perceptible hierarchical boundaries even when hue information is lost or distorted by the user's vision.
- **Motion & Transitions:** Definition of a semantic animation system mapping structural intents to motion (e.g., easing curves, duration tokens). This must include native integration with the `prefers-reduced-motion` media query to disable purely decorative transitions for accessibility.
- **Forced Colors & High Contrast Mode:** Architectural support for operating system-level overrides (e.g., Windows High Contrast). The system must gracefully degrade and rely purely on geometric boundaries and semantic HTML when custom CSS color layers are stripped away by the OS.
- **Fluid Typography & Spacing:** Transitioning the primitive and semantic scale tokens from static increments to fluid, mathematically driven constraints via CSS `clamp()`. This ensures that macro-spatial intents (headings, main gaps) scale continuously based on viewport dynamics directly from Layer 1, keeping Layer 3 and components entirely declarative and free of layout calculations.

<p align="right"><a href="#toc">[back to TOC]</a></p>

## 8. Technical Limitations

- **Media Queries:** CSS Custom Properties cannot be used inside `@media` declarations. Breakpoints must remain static values or be handled via a pre-processor (e.g., PostCSS) until browser specifications evolve.

<p align="right"><a href="#toc">[back to TOC]</a></p>

## 9. Architectural Compromises

### 9.1 The Token Coupling Debt

Currently, the system conceptually couples the abstract design tokens (the dictionary) with their web implementation (the CSS variables) within the same underlying foundation. In a strictly orthodox, platform-agnostic design system, tokens exist as raw data (e.g., JSON) that is subsequently compiled into CSS, TypeScript definitions, or native mobile formats.

This coupling is a conscious, pragmatic technical debt chosen to avoid premature over-engineering. While the versioning and synchronization risks are mitigated by managing the packages within a monorepo environment, this architecture natively limits horizontal scalability to non-web platforms. Furthermore, it prevents the out-of-the-box generation of strict TypeScript interfaces for component properties directly from the token source. This boundary is acknowledged and must be re-evaluated if the ecosystem expands beyond its current web-centric scope.

### 9.2 The Legacy of @duskit/design-tokens

This monorepo used to contain a dormant package (`@duskit/design-tokens`) that served as an early experiment in structuring tokens around the W3C Design Tokens Community Group specifications. While the initial draft explored the architectural ideal of a platform-agnostic source of truth, the project was paused to prioritize the immediate delivery of a functional and strictly governed CSS framework.

At this stage, we have chosen a pragmatic path by establishing `@duskit/css` as the current single source of truth. The legacy experiment has been removed from the repository to maintain a clean codebase and avoid architectural confusion. However, the intent behind that experiment remains valid: the insights gained will serve as a foundation for future efforts to decouple tokens into a dedicated, automated infrastructure when the ecosystem’s scale requires multi-platform support.

<p align="right"><a href="#toc">[back to TOC]</a></p>
