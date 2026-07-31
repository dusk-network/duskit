<svelte:options immutable={true} />

<script>
  /** @typedef {import("./CopyField").CopyFieldProps} CopyFieldProps */

  import { mdiContentCopy } from "@mdi/js";
  import { getErrorFrom } from "@duskit/error";
  import { makeClassName } from "@duskit/string";

  import { Button, Textbox, notifier } from "../..";

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
        notifier.toast({
          dismissable: false,
          iconPath: mdiContentCopy,
          text: `${name} copied to clipboard`,
          timeout: 2000,
          title: "Success",
          type: "success",
        });
      })
      .catch((reason) => {
        const error = getErrorFrom(reason);
        const texts =
          error.name === "NotAllowedError"
            ? {
                text: "Clipboard access denied",
                title: "Not allowed",
              }
            : {
                text: error.message,
                title: "Error",
              };

        notifier.toast({
          dismissable: false,
          ...texts,
          type: "error",
        });
      });
  }

  $: classes = makeClassName(["dusk-copy-field", className]);
</script>

<div
  bind:this={rootElement}
  {...$$restProps}
  aria-disabled={disabled}
  class={classes}
>
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
    variant="secondary"
    {disabled}
  />
</div>
