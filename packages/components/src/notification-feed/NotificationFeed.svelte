<svelte:options immutable={true} />

<script>
  /** @typedef {import("./NotificationFeed").NotificationFeedProps} NotificationFeedProps */

  import { makeClassName } from "@duskit/string";
  import { mdiMessageOffOutline, mdiMessageTextFastOutline } from "@mdi/js";
  import { skipIn } from "lamb";
  import { flip } from "svelte/animate";
  import { fade, fly } from "svelte/transition";

  import getNotificationContext from "../__shared__/getNotificationContext";
  import { DEFAULT_ANIM_DURATION } from "../__shared__/constants";
  import { Button, Notification } from "../..";

  import "./NotificationFeed.css";

  /** @type {NotificationFeedProps["className"]} */
  export let className = undefined;

  /** @type {NotificationFeedProps["extraActions"]} */
  export let extraActions = undefined;

  /** @type {NotificationFeedProps["locale"]} */
  export let locale = undefined;

  /** @type {NotificationFeedProps["store"]} */
  export let store = undefined;

  /** @type {NotificationFeedProps["tooltipId"]} */
  export let tooltipId = undefined;

  /** @type {HTMLDivElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  $: classes = makeClassName(["dusk-notification-feed", className]);
  $: notificationStore = store ?? getNotificationContext();
  $: ({ panels, panelCount, unreadCount } = notificationStore);
  $: hasNotifications = $panelCount > 0;
</script>

<div bind:this={rootElement} {...$$restProps} class={classes}>
  <header class="dusk-notification-feed__header">
    {#if hasNotifications}
      <span class="dusk-notification-feed__header-text">
        Showing <strong>{$panelCount}</strong> notifications,
        <strong>{$unreadCount}</strong> unread.
      </span>
    {/if}
    <Button
      aria-label="Clear all notifications"
      className="dusk-notification-feed__header-button"
      data-tooltip-disabled={!hasNotifications ? "true" : undefined}
      data-tooltip-id={tooltipId}
      data-tooltip-text="Clear all notifications"
      disabled={!hasNotifications}
      icon={{ path: mdiMessageOffOutline }}
      on:click={() => notificationStore.clearPanels()}
      size="small"
      variant="secondary"
    />
    <Button
      aria-label="Mark all as read"
      className="dusk-notification-feed__header-button"
      data-tooltip-disabled={!hasNotifications ? "true" : undefined}
      data-tooltip-id={tooltipId}
      data-tooltip-text="Mark all as read"
      disabled={!hasNotifications}
      icon={{ path: mdiMessageTextFastOutline }}
      on:click={() => notificationStore.markAllAsRead()}
      size="small"
      variant="secondary"
    />
    {#if Array.isArray(extraActions)}
      {#each extraActions as action (action.label)}
        {@const disabled = action.disabled === true}
        <Button
          aria-label={action.label}
          data-tooltip-disabled={disabled ? "true" : undefined}
          data-tooltip-id={tooltipId}
          data-tooltip-text={action.label}
          {disabled}
          icon={{ path: action.iconPath }}
          on:click={action.onClick}
          size="small"
          variant="secondary"
        />
      {/each}
    {/if}
  </header>
  {#if hasNotifications}
    <ul class="dusk-notification-feed__notification-list">
      {#each $panels as panel (panel.id)}
        <li
          animate:flip={{ duration: DEFAULT_ANIM_DURATION }}
          class="dusk-notification-feed__notification-list-item"
          in:fly|global={{ duration: DEFAULT_ANIM_DURATION, y: "-100%" }}
          out:fly|global={{ duration: DEFAULT_ANIM_DURATION, x: "100%" }}
        >
          <Notification
            className="dusk-notification-feed__notification"
            {...skipIn(panel, ["id"])}
            {locale}
            on:dismiss={() => notificationStore.remove(panel.id)}
            on:markasread={() => notificationStore.markAsRead(panel.id)}
            {tooltipId}
          />
        </li>
      {/each}
    </ul>
  {:else}
    <div
      class="dusk-notification-feed__empty-state"
      in:fade={{
        delay: DEFAULT_ANIM_DURATION,
        duration: DEFAULT_ANIM_DURATION / 2,
      }}
    >
      <p>You have no notifications.</p>
    </div>
  {/if}
</div>
