<script>
  /** @typedef {import("./ErrorDetails").ErrorDetailsProps} ErrorDetailsProps */

  import { makeClassName } from "@duskit/string";

  import "./ErrorDetails.css";

  /**
   * @typedef {Object} Props
   * @property {ErrorDetailsProps["className"]} [className]
   * @property {ErrorDetailsProps["error"]} error
   * @property {ErrorDetailsProps["summary"]} summary
   */

  /** @type {Props & { [key: string]: any }} */
  const { className = undefined, error, summary, ...rest } = $props();

  /** @type {HTMLDetailsElement | null} */
  let rootElement = $state(null);

  export const getRootElement = () => rootElement;

  const classes = $derived(makeClassName(["dusk-error-details", className]));
</script>

{#if error}
  <details bind:this={rootElement} {...rest} class={classes}>
    <summary class="dusk-error-details__summary">
      {summary}
    </summary>
    <pre class="dusk-error-details__error">
			{error.message}
		</pre>
  </details>
{/if}
