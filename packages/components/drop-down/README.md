# Duskit - DropDown

[![Storybook](https://img.shields.io/badge/Storybook-Component_Playground-%23FF4785?style=flat&logo=storybook)](https://dusk-network.github.io/duskit/?path=/story/components-atoms-drop-down)
[![Docs](https://img.shields.io/badge/Documentation-%235E35CF?style=flat)](https://dusk-network.github.io/duskit/docs/components/drop-down)

## Installation

```
npm i -D @dusk-network/drop-down
```

## Usage

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=../../../examples/src/drop-down/DropDown_01.svelte) -->
<!-- The below code snippet is automatically added from ../../../examples/src/drop-down/DropDown_01.svelte -->

```svelte
<script>
	import DropDown from "@dusk-network/drop-down";

	const options = [
		{ name: "option 1" },
		{ name: "option 2" },
		{ name: "option 3" },
		{ name: "option 4" },
		{ name: "option 5" },
		{ name: "option 6" },
		{ name: "option 7" },
		{ name: "option 8" },
		{ name: "option 9" },
		{ name: "option 10" },
		{ name: "option 11" },
		{ name: "option 12" },
		{ name: "option 13" },
		{ name: "option 14" },
		{ name: "option 15" },
	];
	function onSelect() {
		//Triggered on new selected value
	}
</script>

<DropDown options="{options}" on:select="{onSelect}" />
```

<!-- MARKDOWN-AUTO-DOCS:END -->
