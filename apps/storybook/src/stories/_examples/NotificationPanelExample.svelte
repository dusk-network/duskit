<svelte:options immutable={true} />

<script>
  import {
    Button,
    CounterIcon,
    NotificationPanel,
    getNotificationContext,
    notifier,
  } from "@duskit/components";
  import {
    mdiAlertCircleOutline,
    mdiAlertOutline,
    mdiBellOutline,
    mdiCheckCircleOutline,
    mdiInformationOutline,
  } from "@mdi/js";

  /** @typedef {import("@duskit/components").StatusType} StatusType */

  const { unreadCount } = getNotificationContext();

  /** @type {Record<StatusType, string>} */
  const icons = {
    error: mdiAlertCircleOutline,
    info: mdiInformationOutline,
    success: mdiCheckCircleOutline,
    warning: mdiAlertOutline,
  };

  /** @type {Record<StatusType, { text: string, title: string }>} */
  const texts = {
    error: { text: "Something went wrong", title: "Error" },
    info: { text: "Cloudy with a chance of meatballs", title: "Weather" },
    success: { text: "All good here!", title: "Success" },
    warning: {
      text: "Longer text here just to scare you and test the wrapping",
      title: "Warning, with a long title because we want it to overflow",
    },
  };

  /** @type {(type: StatusType) => () => void} */
  const addNotification = (type) => () =>
    notifier.panel({
      iconPath: icons[type],
      type,
      ...texts[type],
    });

  /** @type {Button} */
  let btnToggle;
  let open = false;

  /** @param {boolean} status */
  const setPanelStatus = (status) => {
    open = status;
  };
</script>

<section class="panel-example-container">
  <header class="panel-example-header">
    <CounterIcon
      baseIconPath={mdiBellOutline}
      count={$unreadCount}
      size="large"
    />
    <Button
      bind:this={btnToggle}
      data-ignore-outside-click=""
      on:click={() => setPanelStatus(!open)}
      size="small"
      text={`${open ? "Close" : "Open"} Panel`}
    />
    <Button
      data-ignore-outside-click=""
      on:click={addNotification("error")}
      size="small"
      text="Add Error Notification"
    />
    <Button
      data-ignore-outside-click=""
      on:click={addNotification("info")}
      size="small"
      text="Add Info Notification"
    />
    <Button
      data-ignore-outside-click=""
      on:click={addNotification("success")}
      size="small"
      text="Add Success Notification"
    />
    <Button
      data-ignore-outside-click=""
      on:click={addNotification("warning")}
      size="small"
      text="Add Warning Notification"
    />
  </header>
  <div class="panel-example-content">
    <NotificationPanel
      bind:open
      from="right"
      on:closerequest={(event) => {
        const { originalEvent, reason } = event.detail;
        const ignoreOutsideClick =
          reason === "outsideclick" &&
          originalEvent
            .composedPath()
            .filter(
              (el) =>
                el instanceof HTMLElement &&
                el.hasAttribute("data-ignore-outside-click")
            ).length !== 0;

        if (!ignoreOutsideClick) {
          setPanelStatus(false);
        }
      }}
      tooltipId="main-tooltip"
    />
  </div>
</section>

<style>
  .panel-example-container {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 1rem;
    height: 100dvh;
    padding: 1rem;
    overflow: hidden;
  }

  .panel-example-header {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    padding-bottom: 1rem;
  }

  .panel-example-content {
    border: 1px solid #ccc;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .panel-example-content :global(.dusk-notification-panel) {
    position: absolute;
  }
</style>
