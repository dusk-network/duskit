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

  /** @type {HTMLDetailsElement} */
  let rootElement;

  export const getRootElement = () => (error ? null : rootElement);

  $: classes = makeClassName([
    "dusk-error-details",
    "dusk-error-details__details",
    className,
  ]);
</script>

{#if error}
  <details bind:this={rootElement} class={classes}>
    <summary class="dusk-error-details__summary">
      {summary}
    </summary>
    <pre class="dusk-error-details__error">
			{error.message}
		</pre>
  </details>
{/if}
