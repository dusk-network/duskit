<script>
  import { makeClassName } from "@duskit/string";
  import "./styles.css";

  export let text = "";

  /** @type {BadgeVariant} */
  export let variant = "neutral";

  /** @type {String | Undefined} */
  export let className = undefined;

  $: classes = makeClassName([
    "dusk-badge",
    `dusk-badge--variant-${variant}`,
    className,
  ]);
</script>

<span class={classes}>{text}</span>
