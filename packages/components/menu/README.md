# Duskit - Menu

[![Storybook](https://img.shields.io/badge/Storybook-Component_Playground-%23FF4785?style=flat&logo=storybook)](https://dusk-network.github.io/duskit/?path=/story/components-atoms-menu)
[![Docs](https://img.shields.io/badge/Documentation-%235E35CF?style=flat)](https://dusk-network.github.io/duskit/docs/components/menu)

## Installation

```
npm i -D @dusk-network/menu
```

## Usage

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=../../../examples/src/menu/Menu_01.svelte) -->
<!-- The below code snippet is automatically added from ../../../examples/src/menu/Menu_01.svelte -->

```svelte
<script>
	import Menu, { Item } from "@dusk-network/menu";

	const orientation = "horizontal";
</script>

<Menu orientation="{orientation}">
	<Item href="javascript:;">Link 1</Item>
	<Item href="javascript:;">Link 2</Item>
	<Item>No Link</Item>
</Menu>
```

<!-- MARKDOWN-AUTO-DOCS:END -->
