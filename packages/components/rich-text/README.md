# Duskit - RichText

[![Storybook](https://img.shields.io/badge/Storybook-Component_Playground-%23FF4785?style=flat&rich-text=storybook)](https://dusk-network.github.io/duskit/?path=/story/components-atoms-rich-text)
[![Docs](https://img.shields.io/badge/Documentation-%235E35CF?style=flat)](https://dusk-network.github.io/duskit/docs/components/rich-text)

## Installation

```
npm i -D @dusk-network/rich-text
```

## Usage

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=../../../examples/src/rich-text/RichText_01.svelte) -->
<!-- The below code snippet is automatically added from ../../../examples/src/rich-text/RichText_01.svelte -->

```svelte
<script>
	import RichText from "@dusk-network/rich-text";

	const size = "lg";
	const strong = "**This is a strong text**";
</script>

<RichText size="{size}" markdown="{strong}" />
```

<!-- MARKDOWN-AUTO-DOCS:END -->
