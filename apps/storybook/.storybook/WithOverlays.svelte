<script>
  import { Toast, Tooltip } from "@duskit/components";
</script>

<slot />

<!-- Default tooltip used by components relying on data-tooltip-* attributes -->
<Tooltip id="main-tooltip" />

<!-- Toasts are triggered via the exported `toast()` helper -->
<Toast />

