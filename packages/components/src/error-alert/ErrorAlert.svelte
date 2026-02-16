<script>
  /** @typedef {import("./ErrorAlert").ErrorAlertProps} ErrorAlertProps */

  import { mdiCloseThick } from "@mdi/js";

  import { makeClassName } from "@duskit/string";

  import { ErrorDetails, Icon } from "../..";
  import "./ErrorAlert.css";

  /**
   * @typedef {Object} Props
   * @property {ErrorAlertProps["className"]} [className]
   * @property {ErrorAlertProps["error"]} error
   * @property {ErrorAlertProps["gap"]} [gap]
   * @property {ErrorAlertProps["summary"]} summary
   */

  /** @type {Props & { [key: string]: any }} */
  const {
    className = undefined,
    error,
    gap = "default",
    summary,
    ...rest
  } = $props();

  /** @type {HTMLDivElement} */
  let rootElement = /** @type {HTMLDivElement} */ ($state());

  export const getRootElement = () => rootElement;

  const classes = $derived(
    makeClassName([
      "dusk-error-alert",
      `dusk-error-alert--${gap}-gap`,
      className,
    ])
  );
</script>

<div bind:this={rootElement} {...rest} class={classes}>
  <Icon className="dusk-error-alert__icon" path={mdiCloseThick} size="large" />
  <ErrorDetails className="dusk-error-alert__error-details" {error} {summary} />
</div>
