<script>
  import { Anchor } from "@duskit/components";
  import { makeClassName } from "@duskit/string";
  import "./styles.css";

  /** @type {String | Undefined} */
  export let className = undefined;

  /** @type { NavListProp } */
  export let navigation;

  $: classes = makeClassName(["dusk-nav-list", className]);
</script>

{#if navigation}
  <nav class={classes}>
    {#each navigation as item (item)}
      <Anchor
        className="dusk-nav-list__link"
        href={item.link}
        text={item.title}
      />
    {/each}
  </nav>
{/if}
