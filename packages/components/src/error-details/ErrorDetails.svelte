<svelte:options immutable={true} />

<script>
  /** @typedef {import("./ErrorDetails").ErrorDetailsProps} ErrorDetailsProps */

  import { makeClassName } from "@duskit/string";

  import "./ErrorDetails.css";

  /** @type {ErrorDetailsProps["className"]} */
  export let className = undefined;

  /** @type {ErrorDetailsProps["error"]} */
  export let error;

  /** @type {ErrorDetailsProps["summary"]} */
  export let summary;

  /** @type {HTMLDetailsElement | null} */
  let rootElement = null;

  export const getRootElement = () => rootElement;

  $: classes = makeClassName(["dusk-error-details", className]);
</script>

{#if error}
  <details bind:this={rootElement} {...$$restProps} class={classes}>
    <summary class="dusk-error-details__summary">
      {summary}
    </summary>
    <pre class="dusk-error-details__error">
			{error.message}
		</pre>
  </details>
{/if}
