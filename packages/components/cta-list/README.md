# Duskit - CtaList

[![Storybook](https://img.shields.io/badge/Storybook-Component_Playground-%23FF4785?style=flat&logo=storybook)](https://dusk-network.github.io/duskit/?path=/story/components-atoms-cta-list)
[![Docs](https://img.shields.io/badge/Documentation-%235E35CF?style=flat)](https://dusk-network.github.io/duskit/docs/components/cta-list)

## Installation

```
npm i -D @dusk-network/cta-list
```

## Usage

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=../../../examples/src/cta-list/CtaList_01.svelte) -->
<!-- The below code snippet is automatically added from ../../../examples/src/cta-list/CtaList_01.svelte -->

```svelte
<script>
	import CtaList, { Item } from "@dusk-network/cta-list";
	import RichText from "@dusk-network/rich-text";

	const type = "ordered";
</script>

<CtaList type="{type}">
	<Item>
		<RichText>First</RichText>
	</Item>
	<Item>
		<RichText>Second</RichText>
	</Item>
</CtaList>
```

<!-- MARKDOWN-AUTO-DOCS:END -->
