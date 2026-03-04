<script>
  import { Button, Toast, toast } from "@duskit/components";

  import {
    mdiAlertCircleOutline,
    mdiCheckDecagramOutline,
    mdiInformationOutline,
    mdiAlertOutline,
  } from "@mdi/js";

  export let flyDuration = 500;
  export let timer = 2000;

  /**
   * @param {import("@duskit/components").StatusType} type
   * @param {string} message
   * @param {string} icon
   */
  const push = (type, message, icon) => {
    toast(type, message, icon);
  };
</script>

<div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
  <Button
    text="Info toast"
    variant="secondary"
    on:click={() =>
      push("info", "Informational message", mdiInformationOutline)}
  />
  <Button
    text="Success toast"
    variant="secondary"
    on:click={() =>
      push("success", "Everything looks good", mdiCheckDecagramOutline)}
  />
  <Button
    text="Warning toast"
    variant="secondary"
    on:click={() =>
      push("warning", "Something needs attention", mdiAlertOutline)}
  />
  <Button
    text="Error toast"
    variant="secondary"
    on:click={() =>
      push(
        "error",
        "Something went wrong. This is a rather long message. Really. Not joking here.",
        mdiAlertCircleOutline
      )}
  />
</div>

{#key `${timer}:${flyDuration}`}
  <Toast {flyDuration} {timer} />
{/key}
