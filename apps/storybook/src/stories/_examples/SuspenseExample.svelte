<script>
  import { Suspense } from "@duskit/components";

  export let gap = "default";
  export let errorMessage = "Something went wrong";
  export let errorVariant = "alert";
  export let pendingMessage = "Loading...";
  export let ms = 900;
  export let shouldReject = false;
  export let value = "Success";

  $: waitFor = new Promise((resolve, reject) => {
    const delay = Math.max(0, Number(ms) || 0);

    window.setTimeout(() => {
      if (shouldReject) {
        reject(new Error("Simulated failure"));
      } else {
        resolve(value);
      }
    }, delay);
  });
</script>

<Suspense
  {errorMessage}
  {errorVariant}
  {gap}
  {pendingMessage}
  {waitFor}
  style="min-height: 140px; width: 100%; border: 1px dashed var(--divider-color-primary); border-radius: 0.75rem;"
>
  <svelte:fragment slot="success-content" let:result>
    <pre style="margin: 0; font-family: var(--mono-font-family);">
{String(result)}</pre
    >
  </svelte:fragment>
</Suspense>

