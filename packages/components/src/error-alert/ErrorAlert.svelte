<svelte:options immutable={true} />

<script>
  /** @typedef {import("./ErrorAlert").ErrorAlertProps} ErrorAlertProps */

  import { mdiCloseThick } from "@mdi/js";

  import { makeClassName } from "@duskit/string";

  import { ErrorDetails, Icon } from "../..";
  import "./ErrorAlert.css";

  /** @type {ErrorAlertProps["className"]} */
  export let className = undefined;

  /** @type {ErrorAlertProps["error"]} */
  export let error;

  /** @type {ErrorAlertProps["gap"]} */
  export let gap = "default";

  /** @type {ErrorAlertProps["summary"]} */
  export let summary;

  /** @type {HTMLDivElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  $: classes = makeClassName([
    "dusk-error-alert",
    gap !== "default" ? `dusk-error-alert--${gap}-gap` : "",
    className,
  ]);
</script>

<div bind:this={rootElement} {...$$restProps} class={classes}>
  <Icon className="dusk-error-alert__icon" path={mdiCloseThick} size="large" />
  <ErrorDetails className="dusk-error-alert__error-details" {error} {summary} />
</div>
