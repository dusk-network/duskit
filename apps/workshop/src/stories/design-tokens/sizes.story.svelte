<script>
  /* eslint-disable svelte/require-optimized-style-attribute */

  export let Hst;

  /* eslint-disable sort-keys */
  const tokens = {
    0: 0,
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    32: "8rem",
    40: "10rem",
    48: "12rem",
    56: "14rem",
    64: "16rem",
    auto: "auto",
    px: "1px",
    screen: "100vw",
    "1/2": "50%",
    "1/3": "33.333333%",
    "2/3": "66.666667%",
    "1/4": "25%",
    "2/4": "50%",
    "3/4": "75%",
    "1/5": "20%",
    "2/5": "40%",
    "3/5": "60%",
    "4/5": "80%",
    "1/6": "16.666667%",
    "2/6": "33.333333%",
    "3/6": "50%",
    "4/6": "66.666667%",
    "5/6": "83.333333%",
    "1/12": "8.333333%",
    "2/12": "16.666667%",
    "3/12": "25%",
    "4/12": "33.333333%",
    "5/12": "41.666667%",
    "6/12": "50%",
    "7/12": "58.333333%",
    "8/12": "66.666667%",
    "10/12": "83.333333%",
    "11/12": "91.666667%",
    full: "100%",
  };
  /* eslint-enable sort-keys */
</script>

<svelte:component
  this={Hst.Story}
  layout={{ iframe: false, type: "single" }}
  icon="mdi:ruler"
  title="Sizes"
  group="design-tokens"
  responsiveDisabled
  autoPropsDisabled
>
  {#each Object.entries(tokens) as [key, value] (key)}
    <div class="htw-flex htw-flex-col htw-gap-2 htw-my-8">
      <div class="htw-bg-gray-500/10">
        <div
          class="htw-h-20 htw-bg-primary-500"
          style={`width: ${value}`}
        ></div>
      </div>
      <div class="htw-mx-4">
        <div class="htw-flex htw-gap-1">
          <pre class="htw-my-0 htw-truncate htw-shrink">{key}</pre>
        </div>
        <div class="htw-flex htw-gap-1">
          <pre
            class="htw-my-0 htw-opacity-50 htw-truncate htw-shrink">{value}</pre>
        </div>
      </div>
    </div>
  {/each}
</svelte:component>
