<script>
  /** @typedef {import("./CopyField").CopyFieldProps} CopyFieldProps */

  import { mdiAlertOutline, mdiContentCopy } from "@mdi/js";

  import { makeClassName } from "@duskit/string";

  import { Button, Textbox } from "../..";
  import { toast } from "../toast/store";

  import "./CopyField.css";

  /**
   * @typedef {Object} Props
   * @property {CopyFieldProps["className"]} [className]
   * @property {CopyFieldProps["disabled"]} [disabled]
   * @property {CopyFieldProps["displayValue"]} displayValue
   * @property {CopyFieldProps["name"]} name
   * @property {CopyFieldProps["rawValue"]} rawValue
   * @property {CopyFieldProps["tooltipId"]} [tooltipId]
   */

  /** @type {Props & { [key: string]: any }} */
  const {
    className = undefined,
    disabled = false,
    displayValue,
    name,
    rawValue,
    tooltipId = "main-tooltip",
    ...rest
  } = $props();

  /** @type {HTMLDivElement} */
  let rootElement = /** @type {HTMLDivElement} */ ($state());

  export const getRootElement = () => rootElement;

  function copyToClipboard() {
    navigator.clipboard
      .writeText(rawValue)
      .then(() => {
        toast("success", `${name} copied`, mdiContentCopy);
      })
      .catch((err) => {
        toast(
          "error",
          err.name === "NotAllowedError"
            ? "Clipboard access denied"
            : err.message,
          mdiAlertOutline
        );
      });
  }

  const classes = $derived(makeClassName(["dusk-copy-field", className]));
</script>

<div bind:this={rootElement} class={classes} {...rest}>
  <Textbox
    className="dusk-copy-field__content"
    value={displayValue}
    type="text"
    readonly
  />
  <Button
    aria-label="Copy Address"
    className="dusk-copy-field__button"
    data-tooltip-id={tooltipId}
    data-tooltip-text="Copy to clipboard"
    icon={{ path: mdiContentCopy }}
    on:click={copyToClipboard}
    variant="primary"
    {disabled}
  />
</div>
