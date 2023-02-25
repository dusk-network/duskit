# Duskit - Heading

[![Storybook](https://img.shields.io/badge/Storybook-Component_Playground-%23FF4785?style=flat&logo=storybook)](https://dusk-network.github.io/duskit/?path=/story/components-atoms-heading)
[![Docs](https://img.shields.io/badge/Documentation-%235E35CF?style=flat)](https://dusk-network.github.io/duskit/docs/components/heading)

## Installation

```
npm i -D @dusk-network/heading
```

## Usage

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=../../../examples/src/heading/Heading_01.svelte) -->
<!-- The below code snippet is automatically added from ../../../examples/src/heading/Heading_01.svelte -->

```svelte
<script>
	import Heading from "@dusk-network/heading";
	import Button from "@dusk-network/button";
	import Icon from "@dusk-network/icon";

	const icon = "dusk-ticker";
	const heading = "<h1>This is a heading</h1>";
	const button = "Confirm";
</script>

<Heading>
	<svelte:fragment slot="icon">
		{#if icon}
			<Icon name="{icon}" />
		{/if}
	</svelte:fragment>
	{@html heading}
	<svelte:fragment slot="button">
		{#if button}
			<Button>{button}</Button>
		{/if}
	</svelte:fragment>
</Heading>
```

<!-- MARKDOWN-AUTO-DOCS:END -->
