<svelte:options immutable={true} />

<script>
  /** @typedef {import("./CopyField").CopyFieldProps} CopyFieldProps */

  import { mdiAlertOutline, mdiContentCopy } from "@mdi/js";

  import { makeClassName } from "@duskit/string";

  import { Button, Textbox } from "../..";
  import { toast } from "../toast/store";

  import "./CopyField.css";

  /** @type {CopyFieldProps["className"]} */
  export let className = undefined;

  /** @type {CopyFieldProps["disabled"]} */
  export let disabled = false;

  /** @type {CopyFieldProps["displayValue"]} */
  export let displayValue;

  /** @type {CopyFieldProps["name"]} */
  export let name;

  /** @type {CopyFieldProps["rawValue"]} */
  export let rawValue;

  /** @type {CopyFieldProps["tooltipId"]} */
  export let tooltipId = "main-tooltip";

  /** @type {HTMLDivElement} */
  let rootElement;

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

  $: classes = makeClassName(["dusk-copy-field", className]);
</script>

<div bind:this={rootElement} class={classes} {...$$restProps}>
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
