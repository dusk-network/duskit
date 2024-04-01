# NavList

## Usage

```svelte
<script>
  import { NavList } from "@duskit/components";

  let navigation = [
    {
      title: "Dusk",
      link: "https://dusk.network",
    },
    {
      title: "Explorer",
      link: "https://explorer.dusk.network",
    },
  ];
</script>

<NavList {navigation} />
```
