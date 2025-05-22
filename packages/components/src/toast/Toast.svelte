<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Toast").ToastProps} ToastProps */

  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";

  import { makeClassName } from "@duskit/string";

  import { Icon } from "../..";
  import { toastList, toastTimer } from "./store";
  import "./Toast.css";

  const defaultTimer = 2000;

  /** @type {ToastProps["className"]} */
  export let className = undefined;

  /** @type {ToastProps["flyDuration"]} */
  export let flyDuration = 500;

  /** @type {ToastProps["timer"]} */
  export let timer = defaultTimer;

  /** @type {HTMLUListElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  onMount(() => {
    $toastTimer = timer ?? defaultTimer;
  });

  $: classes = makeClassName(["dusk-toast", className]);
</script>

<ul bind:this={rootElement} {...$$restProps} class={classes}>
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
