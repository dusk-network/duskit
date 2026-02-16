<script>
  import { createBubbler, handlers } from "svelte/legacy";

  const bubble = createBubbler();
  /** @typedef {import("./Textbox").TextboxProps} TextboxProps */
  /** @typedef {import("./Textbox").TextboxType} TextboxType */

  import { makeClassName } from "@duskit/string";

  import "./Textbox.css";

  /**
   * @typedef {Object} Props
   * @property {TextboxProps["className"]} [className]
   * @property {TextboxType} [type]
   * @property {string | number} [value]
   */

  /** @type {Props & { [key: string]: any }} */
  /* eslint-disable prefer-const */
  let {
    className = undefined,
    type = "text",
    value = $bindable(type === "number" ? 0 : ""),
    ...rest
  } = $props();
  /* eslint-enable prefer-const */

  /** @type {HTMLTextAreaElement | HTMLInputElement} */
  let rootElement = /** @type {HTMLTextAreaElement | HTMLInputElement} */ (
    $state()
  );

  export const getRootElement = () => rootElement;

  export function focus() {
    rootElement?.focus();
  }

  export function select() {
    rootElement?.select();
  }

  /**
   * Needed, as the value cannot be bound to the input element
   * when the type is set dynamically
   * @param {Event} event
   */
  function handleInput(event) {
    const target = /** @type {HTMLInputElement} */ (event.currentTarget);

    value = target.type === "number" ? target.valueAsNumber : target.value;
  }

  const classes = $derived(
    makeClassName(["dusk-textbox", `dusk-textbox-${type}`, className])
  );
</script>

{#if type === "multiline"}
  <textarea
    {...rest}
    class={classes}
    bind:this={rootElement}
    bind:value
    onblur={bubble("blur")}
    onfocus={bubble("focus")}
    oninput={bubble("input")}
    onkeydown={bubble("keydown")}
    onpaste={bubble("paste")}
  ></textarea>
{:else}
  <input
    {...rest}
    class={classes}
    {type}
    {value}
    bind:this={rootElement}
    onblur={bubble("blur")}
    onfocus={bubble("focus")}
    oninput={handlers(handleInput, bubble("input"))}
    onkeydown={bubble("keydown")}
    onpaste={bubble("paste")}
  />
{/if}
