<svelte:options immutable={true} />

<script>
  import { Button, NotificationFeed, notifier } from "@duskit/components";
  import {
    mdiAlertCircleOutline,
    mdiAlertOutline,
    mdiCheckCircleOutline,
    mdiInformationOutline,
  } from "@mdi/js";

  /** @typedef {import("@duskit/components").StatusType} StatusType */

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
</script>

<section class="feed-example-container">
  <header class="feed-example-header">
    <Button
      on:click={addNotification("error")}
      size="small"
      text="Add Error Notification"
    />
    <Button
      on:click={addNotification("info")}
      size="small"
      text="Add Info Notification"
    />
    <Button
      on:click={addNotification("success")}
      size="small"
      text="Add Success Notification"
    />
    <Button
      on:click={addNotification("warning")}
      size="small"
      text="Add Warning Notification"
    />
  </header>
  <div class="feed-example-content">
    <NotificationFeed tooltipId="main-tooltip" />
  </div>
</section>

<style>
  .feed-example-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100dvh;
    padding: 1rem;
    overflow: hidden;
  }

  .feed-example-header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .feed-example-content {
    border: 1px solid #ccc;
    flex: 1;
    max-width: 100%;
    overflow: hidden;
    width: 30rem;
  }
</style>
