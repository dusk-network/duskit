<script>
  import {
    NotificationProvider,
    ToastContainer,
    Tooltip,
  } from "@duskit/components";
</script>

<NotificationProvider>
  <slot />

  <!-- Default tooltip used by components relying on data-tooltip-* attributes -->
  <Tooltip id="main-tooltip" />

  <!-- Toasts are triggered via the exported `notifier` -->
  <ToastContainer tooltipId="main-tooltip" />
</NotificationProvider>
