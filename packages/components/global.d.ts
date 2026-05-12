/**
 * Purely cosmetic declaration to Allow importing CSS files as side-effects
 * in Svelte components.
 * The official `svelte-check` CLI already understands
 * this context and passes without issues.
 *
 * This is required for the VSCode/Svelte TypeScript language server to
 * correctly understand statements like:
 *
 * import "./Button.css";
 *
 * without raising errors like:
 * "Cannot find module or type declarations for side-effect import of './Button.css'.".
 *
 * Since this library ships unbundled, the actual CSS processing is handled by the
 * consumer's build tool / bundler (e.g. Vite, Webpack, etc.).
 */
declare module "*.css";
