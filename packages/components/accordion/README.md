# Duskit - Accordion

[![Storybook](https://img.shields.io/badge/Storybook-Component_Playground-%23FF4785?style=flat&logo=storybook)](https://dusk-network.github.io/duskit/?path=/story/components-atoms-accordion)
[![Docs](https://img.shields.io/badge/Documentation-%235E35CF?style=flat)](https://dusk-network.github.io/duskit/docs/components/accordion)

## Installation

```
npm i -D @dusk-network/accordion
```

## Usage

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=../../../examples/src/accordion/Accordion_01.svelte) -->
<!-- The below code snippet is automatically added from ../../../examples/src/accordion/Accordion_01.svelte -->

```svelte
<script>
	import Accordion, { Item } from "@dusk-network/accordion";
</script>

<Accordion multiselect="{true}">
	<Item title="First Item">First item content...</Item>
	<Item title="Second Item">Second item content...</Item>
	<Item title="Third Item">Third item content...</Item>
	<Item title="Fourth Item">Fourth item content...</Item>
</Accordion>
```

<!-- MARKDOWN-AUTO-DOCS:END -->
