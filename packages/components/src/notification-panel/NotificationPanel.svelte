<svelte:options immutable={true} />

<script>
  /** @typedef {import("./NotificationPanel").NotificationPanelProps} NotificationPanelProps */
  /** @typedef {import("./NotificationPanel").NotificationPanelCloseDetails} NotificationPanelCloseDetails */
  /** @typedef {import("../notification-feed/NotificationFeed").NotificationFeedAction} NotificationFeedAction */

  import { makeClassName } from "@duskit/string";
  import { mdiClose } from "@mdi/js";
  import { createEventDispatcher } from "svelte";

  import { Drawer } from "../..";
  import getNotificationContext from "../__shared__/getNotificationContext";
  import NotificationFeed from "../notification-feed/NotificationFeed.svelte";

  import "./NotificationPanel.css";

  /** @type {NotificationPanelProps["className"]} */
  export let className = undefined;

  /** @type {NotificationPanelProps["from"]} */
  export let from;

  /** @type {NotificationPanelProps["locale"]} */
  export let locale = undefined;

  /** @type {NotificationPanelProps["open"]} */
  export let open;

  /** @type {NotificationPanelProps["store"]} */
  export let store = undefined;

  /** @type {NotificationPanelProps["tooltipId"]} */
  export let tooltipId = undefined;

  /** @type {Drawer} */
  let rootComponent;

  const dispatch = createEventDispatcher();

  /**
   * @param {NotificationPanelCloseDetails["reason"]} reason
   * @param {NotificationPanelCloseDetails["originalEvent"]} originalEvent
   */
  const handleCloseRequest = (reason, originalEvent) => {
    dispatch("closerequest", { originalEvent, reason }, { cancelable: true });
  };

  /** @type {NotificationFeedAction[]} */
  const panelActions = [
    {
      iconPath: mdiClose,
      label: "Close notification panel",
      onClick: (evt) => handleCloseRequest("closebutton", evt),
    },
  ];

  export const getRootElement = () => rootComponent.getRootElement();

  $: classes = makeClassName(["dusk-notification-panel", className]);
  $: notificationStore = store ?? getNotificationContext();
  $: ({ unreadCount } = notificationStore);
  $: announcerMessage =
    $unreadCount === 0
      ? "No unread notifications"
      : `You have ${$unreadCount} unread notifications`;
</script>

<div
  aria-live="polite"
  class="dusk-notification-panel__announcer"
  role="status"
>
  {announcerMessage}
</div>

<Drawer
  bind:this={rootComponent}
  {...$$restProps}
  className={classes}
  from={from ?? "right"}
  on:cancel={(evt) => handleCloseRequest("cancel", evt.detail.originalEvent)}
  on:close
  on:closing
  on:open
  on:opening
  on:outsideclick={(evt) =>
    handleCloseRequest("outsideclick", evt.detail.originalEvent)}
  {open}
  size="large"
  let:visible
>
  {#if visible}
    <NotificationFeed
      extraActions={panelActions}
      {locale}
      store={notificationStore}
      {tooltipId}
    />
  {/if}
</Drawer>
