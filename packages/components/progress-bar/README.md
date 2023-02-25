# Duskit - ProgressBar

[![Storybook](https://img.shields.io/badge/Storybook-Component_Playground-%23FF4785?style=flat&progress-bar=storybook)](https://dusk-network.github.io/duskit/?path=/story/components-atoms-progress-bar)
[![Docs](https://img.shields.io/badge/Documentation-%235E35CF?style=flat)](https://dusk-network.github.io/duskit/docs/components/progress-bar)

## Installation

```
npm i -D @dusk-network/progress-bar
```

## Usage

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=../../../examples/src/progress-bar/ProgressBar_01.svelte) -->
<!-- The below code snippet is automatically added from ../../../examples/src/progress-bar/ProgressBar_01.svelte -->

```svelte
<script>
	import ProgressBar from "@dusk-network/progress-bar";

	const step = 1;
	const steps = 3;
	const variant = "danger";
</script>

<ProgressBar step="{step}" steps="{steps}" variant="{variant}" />
```

<!-- MARKDOWN-AUTO-DOCS:END -->
