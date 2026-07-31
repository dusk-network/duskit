<svelte:options immutable={true} />

<script>
  import {
    Button,
    NotificationProvider,
    ToastContainer,
    Tooltip,
    notifier,
  } from "@duskit/components";
  import {
    mdiAlertCircleOutline,
    mdiAlertOutline,
    mdiCheckCircleOutline,
    mdiInformationOutline,
  } from "@mdi/js";

  /** @typedef {import("@duskit/components").StatusType} StatusType */
  /** @typedef {import("svelte").ComponentProps<ToastContainer>} ToastContainerProps */

  /** @type {ToastContainerProps["placement"]} */
  export let placement = "top-right";

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

  /** @type {(type: StatusType, dismissable?: boolean) => () => void} */
  const triggerToast =
    (type, dismissable = false) =>
    () =>
      notifier.toast({
        dismissable,
        iconPath: icons[type],
        type,
        ...texts[type],
      });
</script>

<NotificationProvider>
  <section
    style="display: flex; flex-direction: column; gap: 1rem; max-width: 14rem;"
  >
    <Button on:click={triggerToast("error")} size="small" text="Error Toast" />
    <Button
      on:click={triggerToast("info", true)}
      size="small"
      text="Info Toast"
    />
    <Button
      on:click={triggerToast("success", true)}
      size="small"
      text="Success Toast"
    />
    <Button
      on:click={triggerToast("warning")}
      size="small"
      text="Warning Toast"
    />
  </section>

  <Tooltip id="toast-tooltip" />
  <ToastContainer {placement} tooltipId="toast-tooltip" />
</NotificationProvider>
