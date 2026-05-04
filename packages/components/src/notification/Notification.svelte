<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Notification").NotificationProps} NotificationProps */
  /** @typedef {import("./Notification").PanelNotificationProps} PanelNotificationProps */
  /** @typedef {import("./Notification").ToastNotificationProps} ToastNotificationProps */

  import { makeClassName } from "@duskit/string";
  import {
    mdiAlertCircleOutline,
    mdiAlertOutline,
    mdiCheckCircleOutline,
    mdiClose,
    mdiInformationOutline,
    mdiMessageTextOutline,
  } from "@mdi/js";
  import { createEventDispatcher } from "svelte";

  import { Button, Icon, ProgressBar, RelativeTime } from "../..";

  import "./Notification.css";

  /** @type {NotificationProps["className"]} */
  export let className = undefined;

  /** @type {NotificationProps["date"]} */
  export let date;

  /** @type {NotificationProps extends ToastNotificationProps ? ToastNotificationProps["decayProgress"] : undefined} */
  export let decayProgress;

  /** @type {NotificationProps["dismissable"]} */
  export let dismissable;

  /** @type {NotificationProps["iconPath"]} */
  export let iconPath = undefined;

  /** @type {NotificationProps["locale"]} */
  export let locale = undefined;

  /** @type {NotificationProps["mode"]} */
  export let mode;

  /** @type {NotificationProps extends PanelNotificationProps ? PanelNotificationProps["read"] : undefined} */
  export let read;

  /** @type {NotificationProps["text"]} */
  export let text = undefined;

  /** @type {NotificationProps["title"]} */
  export let title = undefined;

  /** @type {NotificationProps["tooltipId"]} */
  export let tooltipId = undefined;

  /** @type {NotificationProps["type"]} */
  export let type;

  /** @type {HTMLDivElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  // two days
  const RECENT_THRESHOLD_MS = 1000 * 60 * 60 * 24 * 2;

  /** @type {Record<NotificationProps["type"], string>}*/
  const defaultIcons = {
    error: mdiAlertCircleOutline,
    info: mdiInformationOutline,
    success: mdiCheckCircleOutline,
    warning: mdiAlertOutline,
  };

  const dispatch = createEventDispatcher();

  $: classes = makeClassName([
    "dusk-notification",
    `dusk-notification--mode--${mode}`,
    `dusk-notification--type--${type}`,
    mode === "toast" ? undefined : read ? "" : "dusk-notification--unread",
    className,
  ]);
  $: dateFormatter = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  $: isRecent = Date.now() - date.getTime() < RECENT_THRESHOLD_MS;
  $: path = iconPath ?? defaultIcons[type];
  $: role =
    mode === "toast"
      ? type === "error" || type === "warning"
        ? "alert"
        : "status"
      : undefined;
</script>

<div
  bind:this={rootElement}
  {...$$restProps}
  class={classes}
  on:mouseenter
  on:mouseleave
  {role}
>
  <header class="dusk-notification__header">
    <strong class="dusk-notification__header-text">{title ?? ""}</strong>
    {#if mode === "panel" && !read}
      <Button
        aria-label="Mark as read"
        className="dusk-notification__btn-mark-as-read"
        data-tooltip-id={tooltipId}
        data-tooltip-text="Mark as read"
        icon={{ path: mdiMessageTextOutline }}
        on:click={() => dispatch("markasread")}
        size="small"
        variant="naked"
      />
    {/if}
    {#if dismissable}
      <Button
        aria-label="Dismiss"
        className="dusk-notification__btn-dismiss"
        data-tooltip-delay-show={mode === "toast" ? "200" : undefined}
        data-tooltip-id={tooltipId}
        data-tooltip-text="Dismiss"
        icon={{ path: mdiClose }}
        on:click={() => dispatch("dismiss")}
        size="small"
        variant="naked"
      />
    {/if}
  </header>
  <div class="dusk-notification__body">
    <Icon {path} size="large" />
    <div class="dusk-notification__content">
      <slot><p>{text ?? ""}</p></slot>
    </div>
  </div>

  <footer class="dusk-notification__footer">
    {#if mode === "panel"}
      {#if !read}
        <strong>UNREAD</strong>
      {/if}
      {#if isRecent}
        <RelativeTime autoRefresh={true} {date} />
      {:else}
        <time datetime={date.toISOString()}>{dateFormatter.format(date)}</time>
      {/if}
    {:else}
      <ProgressBar direction="rtl" size="default" value={decayProgress} />
    {/if}
  </footer>
</div>
