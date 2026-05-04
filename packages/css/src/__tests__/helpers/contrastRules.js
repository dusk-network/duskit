/**
 * CONTRAST AND ACCESSIBILITY RULES
 *
 * This design system uses a tri-algorithm approach for contrast validation,
 * applying the correct mathematical model to the specific semantic intent:
 *
 * 1. WCAG 2.1 (Relative Luminance): Strictly enforced for text readability (4.5:1 / 7:1)
 * and legal interactive boundaries like focus rings (3:1).
 *
 * 2. Lstar / Delta L* (Perceptual Lightness): Used for structural surfaces,
 * neutral containers, and base action colors to ensure perceptible visual hierarchy.
 * Based on a Design System Unit (DSU) of 3.5 Lstar:
 * - 1x DSU (3.5+): Structural layers (e.g., surfaces, embedded surfaces, subtle neutral)
 * - 2x DSU (7.0+): Solid structural containers (e.g., neutral base/strong)
 * - 4x DSU (14.0+): Primary focal points
 *
 * 3. DeltaE2000 (Chromatic Distance): Exclusively used for active status tokens
 * (error, info, success, warning) to validate their semantic recognizability
 * as visual alerts in the 3D color space, avoiding the "paradox of yellow"
 * caused by luminance-only checks.
 *
 * Note: Typography contrast rules (WCAG 4.5:1) for `--on-*` tokens are not
 * defined here. They are dynamically inferred and strictly enforced directly
 * within the test suite (`theme.spec.js`) to guarantee zero-maintenance
 * compliance for all text elements.
 */

/** @type {Record<string, ThemeRule[]>} */
export default {
  actionRules: [
    {
      algorithm: "Lstar",
      description:
        "Ensure that the base primary action color has a strong perceptual lightness difference against surfaces to establish top visual hierarchy.",
      minimumRatio: 14,
      testAgainst: [
        "--background-color",
        "--surface-color",
        "--surface-layer-color",
      ],
      tokens: ["--action-primary-color"],
    },
    {
      algorithm: "Lstar",
      description:
        "Ensure that the base secondary action color has a relaxed perceptual lightness difference against surfaces, maintaining a subtle presence without competing with primary actions.",
      minimumRatio: 7,
      testAgainst: [
        "--background-color",
        "--surface-color",
        "--surface-layer-color",
      ],
      tokens: ["--action-secondary-color"],
    },
    {
      algorithm: "Lstar",
      description:
        "Ensure that the base tertiary action color maintains a minimum structural lightness distance against surfaces to establish a baseline low-priority presence.",
      minimumRatio: 3.5,
      testAgainst: [
        "--background-color",
        "--surface-color",
        "--surface-layer-color",
      ],
      tokens: ["--action-tertiary-color"],
    },

    // Layer 1 guarantees a strict 3:1 accessible boundary exclusively for the
    // strong variant of the primary action. The primary action acts as the
    // structural focal point of any interactive group. Secondary and tertiary
    // actions rely on layout proximity and strict text contrast (4.5:1) for
    // affordance, preventing visual pollution and preserving top-level hierarchy.
    {
      algorithm: "WCAG21",
      description:
        "Ensure that the strong variant of the primary action provides a valid 3:1 boundary contrast against any surface.",
      minimumRatio: 3,
      testAgainst: [
        "--background-color",
        "--surface-color",
        "--surface-layer-color",
      ],
      tokens: ["--action-primary-strong-color"],
    },
    {
      algorithm: "DeltaE2000",
      description:
        "Ensure primary actions are chromatically distinct from secondary and tertiary actions to preserve the visual hierarchy of intents.",
      minimumDistance: 10,
      testAgainst: ["--action-secondary-color", "--action-tertiary-color"],
      tokens: ["--action-primary-color"],
    },
    {
      algorithm: "DeltaE2000",
      description:
        "Ensure secondary actions maintain a perceptible minimum chromatic or lightness distance from tertiary actions to prevent visual blending of interactive elements.",
      minimumDistance: 7.5,
      testAgainst: ["--action-tertiary-color"],
      tokens: ["--action-secondary-color"],
    },

    {
      algorithm: "Lstar",
      description:
        "Ensure primary action base colors maintain a 2 DSU (7.0 Lstar) structural separation from primary action strong colors to guarantee clear interactive feedback.",
      minimumRatio: 7,
      testAgainst: ["--action-primary-strong-color"],
      tokens: ["--action-primary-color"],
    },
    {
      algorithm: "Lstar",
      description:
        "Ensure primary action subtle colors maintain a 2 DSU (7.0 Lstar) structural separation from primary action base colors.",
      minimumRatio: 7,
      testAgainst: ["--action-primary-color"],
      tokens: ["--action-primary-subtle-color"],
    },
    {
      algorithm: "Lstar",
      description:
        "Ensure primary action subtle colors maintain a 4 DSU (14.0 Lstar) structural separation from primary action strong colors to define the extremes of the scale.",
      minimumRatio: 14,
      testAgainst: ["--action-primary-strong-color"],
      tokens: ["--action-primary-subtle-color"],
    },
    {
      algorithm: "Lstar",
      description:
        "Ensure secondary action base colors maintain a 2 DSU (7.0 Lstar) structural separation from secondary action strong colors to guarantee clear interactive feedback.",
      minimumRatio: 7,
      testAgainst: ["--action-secondary-strong-color"],
      tokens: ["--action-secondary-color"],
    },
    {
      algorithm: "Lstar",
      description:
        "Ensure secondary action subtle colors maintain a 2 DSU (7.0 Lstar) structural separation from secondary action base colors.",
      minimumRatio: 7,
      testAgainst: ["--action-secondary-color"],
      tokens: ["--action-secondary-subtle-color"],
    },
    {
      algorithm: "Lstar",
      description:
        "Ensure secondary action subtle colors maintain a 4 DSU (14.0 Lstar) structural separation from secondary action strong colors to define the extremes of the scale.",
      minimumRatio: 14,
      testAgainst: ["--action-secondary-strong-color"],
      tokens: ["--action-secondary-subtle-color"],
    },
    {
      algorithm: "Lstar",
      description:
        "Ensure tertiary action base colors maintain a 2 DSU (7.0 Lstar) structural separation from tertiary action strong colors to guarantee clear interactive feedback.",
      minimumRatio: 7,
      testAgainst: ["--action-tertiary-strong-color"],
      tokens: ["--action-tertiary-color"],
    },
    {
      algorithm: "Lstar",
      description:
        "Ensure tertiary action subtle colors maintain a 2 DSU (7.0 Lstar) structural separation from tertiary action base colors.",
      minimumRatio: 7,
      testAgainst: ["--action-tertiary-color"],
      tokens: ["--action-tertiary-subtle-color"],
    },
    {
      algorithm: "Lstar",
      description:
        "Ensure tertiary action subtle colors maintain a 4 DSU (14.0 Lstar) structural separation from tertiary action strong colors to define the extremes of the scale.",
      minimumRatio: 14,
      testAgainst: ["--action-tertiary-strong-color"],
      tokens: ["--action-tertiary-subtle-color"],
    },
  ],

  /*
   * INTERACTIVE STATE TOKENS
   *
   * Focus rings and interactive boundaries are strict legal requirements.
   * We revert to WCAG 2.1 (3:1 contrast ratio) here because these boundaries
   * are explicitly regulated by WCAG 2.2 Focus Appearance criteria.
   * They must pierce through any structural surface they are rendered on.
   */
  interactiveStateRules: [
    {
      algorithm: "WCAG21",
      description:
        "Ensure focus rings maintain a strict 3:1 contrast ratio against all surfaces to serve as a legal and highly visible interactive boundary (WCAG 2.2 Focus Appearance).",
      minimumRatio: 3,
      testAgainst: [
        "--background-color",
        "--surface-color",
        "--surface-embedded-color",
        "--surface-layer-color",
      ],
      tokens: ["--focus-ring-color"],
    },
  ],

  /*
   * STATUS TOKENS
   *
   * We evaluate status tokens across two fundamentally different perceptual axes
   * based on their semantic intent:
   *
   * 1. Semantic Distinctiveness (DeltaE2000):
   * Active states (error, info, success, warning) act as visual alerts. Their
   * primary intent is to be recognized via chromatic distance (hue/saturation),
   * not just luminance. Using Lstar or WCAG here triggers the "Paradox of Yellow",
   * forcing vibrant alerts into dark, muddy tones just to pass luminance checks.
   * DeltaE2000 measures the complete 3D color space distance, validating their
   * true semantic recognizability.
   *
   * 2. Structural Hierarchy (Lstar):
   * The 'neutral' state is the strict exception. Deprived of chroma, it acts as a
   * dormant structural container. Testing neutral greys with DeltaE2000 fails
   * because they share the same hue profile as the background surfaces. Therefore,
   * neutral tokens are validated via Lstar to guarantee topographic elevation
   * (measured in DSUs) without forcing artificial saturation.
   */
  statusRules: [
    // --- Active States (Semantic / Chromatic) ---
    {
      algorithm: "DeltaE2000",
      description:
        "Ensure status colors maintain a strong perceptual chromatic distinction from structural surfaces to act as immediate visual alerts.",
      minimumDistance: 20,
      testAgainst: [
        "--background-color",
        "--surface-color",
        "--surface-layer-color",
      ],
      tokens: [
        "--status-error-color",
        "--status-info-color",
        "--status-success-color",
        "--status-warning-color",
        "--status-error-strong-color",
        "--status-info-strong-color",
        "--status-success-strong-color",
        "--status-warning-strong-color",
      ],
    },
    {
      algorithm: "DeltaE2000",
      description:
        "Ensure status subtle colors maintain a gentle but explicitly perceptible chromatic distinction from structural surfaces.",
      minimumDistance: 10,
      testAgainst: [
        "--background-color",
        "--surface-color",
        "--surface-layer-color",
      ],
      tokens: [
        "--status-error-subtle-color",
        "--status-info-subtle-color",
        "--status-success-subtle-color",
        "--status-warning-subtle-color",
      ],
    },
    {
      algorithm: "DeltaE2000",
      description:
        "Ensure the error status variants maintain sufficient chromatic distance from each other to be perceptibly distinct.",
      minimumDistance: 10,
      testAgainst: [
        "--status-error-strong-color",
        "--status-error-subtle-color",
      ],
      tokens: ["--status-error-color"],
    },
    {
      algorithm: "DeltaE2000",
      description:
        "Ensure the strong and subtle error variants are chromatically distant extremes.",
      minimumDistance: 20,
      testAgainst: ["--status-error-subtle-color"],
      tokens: ["--status-error-strong-color"],
    },
    {
      algorithm: "DeltaE2000",
      description:
        "Ensure the info status variants maintain sufficient chromatic distance from each other to be perceptibly distinct.",
      minimumDistance: 10,
      testAgainst: ["--status-info-strong-color", "--status-info-subtle-color"],
      tokens: ["--status-info-color"],
    },
    {
      algorithm: "DeltaE2000",
      description:
        "Ensure the strong and subtle info variants are chromatically distant extremes.",
      minimumDistance: 20,
      testAgainst: ["--status-info-subtle-color"],
      tokens: ["--status-info-strong-color"],
    },
    {
      algorithm: "DeltaE2000",
      description:
        "Ensure the success status variants maintain sufficient chromatic distance from each other to be perceptibly distinct.",
      minimumDistance: 10,
      testAgainst: [
        "--status-success-strong-color",
        "--status-success-subtle-color",
      ],
      tokens: ["--status-success-color"],
    },
    {
      algorithm: "DeltaE2000",
      description:
        "Ensure the strong and subtle success variants are chromatically distant extremes.",
      minimumDistance: 20,
      testAgainst: ["--status-success-subtle-color"],
      tokens: ["--status-success-strong-color"],
    },
    {
      algorithm: "DeltaE2000",
      description:
        "Ensure the warning status variants maintain sufficient chromatic distance from each other to be perceptibly distinct.",
      minimumDistance: 10,
      testAgainst: [
        "--status-warning-strong-color",
        "--status-warning-subtle-color",
      ],
      tokens: ["--status-warning-color"],
    },
    {
      algorithm: "DeltaE2000",
      description:
        "Ensure the strong and subtle warning variants are chromatically distant extremes.",
      minimumDistance: 20,
      testAgainst: ["--status-warning-subtle-color"],
      tokens: ["--status-warning-strong-color"],
    },

    // --- Neutral States (Structural / Topographic) ---
    {
      algorithm: "Lstar",
      description:
        "Ensure neutral base and strong colors maintain a 2 DSU (7 Lstar) structural separation from surfaces, acting as solid and distinct containers.",
      minimumRatio: 7,
      testAgainst: [
        "--background-color",
        "--surface-color",
        "--surface-layer-color",
      ],
      tokens: ["--neutral-color", "--neutral-strong-color"],
    },
    {
      algorithm: "Lstar",
      description:
        "Ensure neutral subtle colors maintain a gentle 1 DSU (3.5 Lstar) minimum visual boundary against surfaces to prevent blending while keeping noise minimal.",
      minimumRatio: 3.5,
      testAgainst: [
        "--background-color",
        "--surface-color",
        "--surface-layer-color",
      ],
      tokens: ["--neutral-subtle-color"],
    },
    {
      algorithm: "Lstar",
      description:
        "Ensure neutral base colors maintain a 1 DSU (3.5 Lstar) structural separation from neutral strong colors.",
      minimumRatio: 3.5,
      testAgainst: ["--neutral-strong-color"],
      tokens: ["--neutral-color"],
    },
    {
      algorithm: "Lstar",
      description:
        "Ensure neutral subtle colors maintain a 1 DSU (3.5 Lstar) structural separation from neutral base colors.",
      minimumRatio: 3.5,
      testAgainst: ["--neutral-color"],
      tokens: ["--neutral-subtle-color"],
    },
    {
      algorithm: "Lstar",
      description:
        "Ensure neutral subtle colors maintain a 2 DSU (7.0 Lstar) structural separation from neutral strong colors to define the extremes of the scale.",
      minimumRatio: 7,
      testAgainst: ["--neutral-strong-color"],
      tokens: ["--neutral-subtle-color"],
    },
  ],

  /*
   * SURFACE TOKENS
   *
   * Surfaces form the architectural bedrock of the interface. They are devoid
   * of semantic meaning and act only as spatial containers. We validate them
   * exclusively through Lstar, demanding a strict 1 DSU (3.5 Lstar) elevation
   * jump to ensure elements like input fields are perceptually distinct from
   * their surroundings.
   */
  surfaceRules: [
    {
      algorithm: "Lstar",
      description:
        "The primary surface must have a perceptible structural lightness distance from the application background.",
      minimumRatio: 3.5,
      testAgainst: ["--surface-color"],
      tokens: ["--background-color"],
    },
    {
      algorithm: "Lstar",
      description:
        "Nested surface layers must have a perceptible structural lightness distance from their direct parent surface.",
      minimumRatio: 3.5,
      testAgainst: ["--surface-layer-color"],
      tokens: ["--surface-color"],
    },
    {
      algorithm: "Lstar",
      description:
        "Inset surfaces must remain identifiable against surrounding containers",
      minimumRatio: 3.5,
      testAgainst: [
        "--background-color",
        "--surface-color",
        "--surface-layer-color",
      ],
      tokens: ["--surface-embedded-color"],
    },
  ],

  /*
   * TYPOGRAPHY RULES
   *
   * This system enforces a strict WCAG 2.1 AA (4.5:1) baseline for all
   * structural typography intents (e.g., Accent tokens) to ensure readability
   * across all surfaces.
   *
   * Note: Standard content-based typography (e.g., `--on-*` tokens) is not
   * defined here; it is dynamically inferred and enforced directly
   * within `theme.spec.js` to guarantee zero-maintenance compliance.
   */
  typographyRules: [
    {
      algorithm: "WCAG21",
      description:
        "Ensure accent text maintains a 4.5:1 contrast ratio against all surface layers for optimal readability.",
      minimumRatio: 4.5,
      testAgainst: [
        "--background-color",
        "--surface-color",
        "--surface-layer-color",
      ],
      tokens: ["--text-accent-primary-color", "--text-accent-secondary-color"],
    },
    {
      algorithm: "DeltaE2000",
      description:
        "Ensure primary and secondary text accents are perceptually distinct to preserve semantic hierarchy in typographic emphasis.",
      minimumDistance: 10,
      testAgainst: ["--text-accent-secondary-color"],
      tokens: ["--text-accent-primary-color"],
    },
  ],
};
