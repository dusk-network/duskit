<script>
  import { run } from "svelte/legacy";

  /** @typedef {import("./Toast").ToastProps} ToastProps */

  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";

  import { makeClassName } from "@duskit/string";

  import { Icon } from "../..";
  import { toastList, toastTimer } from "./store";
  import "./Toast.css";

  const defaultTimer = 2000;

  /**
   * @typedef {Object} Props
   * @property {ToastProps["className"]} [className]
   * @property {ToastProps["flyDuration"]} [flyDuration]
   * @property {ToastProps["timer"]} [timer]
   */

  /** @type {Props & { [key: string]: any }} */
  const {
    className = undefined,
    flyDuration = 500,
    timer = defaultTimer,
    ...rest
  } = $props();

  /** @type {HTMLUListElement} */
  let rootElement = /** @type {HTMLUListElement} */ ($state());

  export const getRootElement = () => rootElement;

  const classes = $derived(makeClassName(["dusk-toast", className]));
  run(() => {
    $toastTimer = timer ?? defaultTimer;
  });
</script>

<ul bind:this={rootElement} {...rest} class={classes}>
  {#each $toastList as { id, icon, message, type } (id)}
    <li
      in:fly|global={{ duration: flyDuration, x: 200 }}
      out:fly|global={{ duration: flyDuration, x: 200 }}
      animate:flip={{ duration: 200 }}
      class="dusk-toast__item"
    >
      {#if icon}
        <span
          class={`dusk-toast__item-icon-wrapper dusk-toast__item-icon-wrapper--${type}`}
        >
          <Icon className="dusk-toast__item-icon" path={icon} size="default" />
        </span>
      {/if}
      <span class="dusk-toast__item-message">
        {message}
      </span>
    </li>
  {/each}
</ul>
