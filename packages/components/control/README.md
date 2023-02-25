# Duskit - Control

[![Storybook](https://img.shields.io/badge/Storybook-Component_Playground-%23FF4785?style=flat&logo=storybook)](https://dusk-network.github.io/duskit/?path=/story/components-atoms-control)
[![Docs](https://img.shields.io/badge/Documentation-%235E35CF?style=flat)](https://dusk-network.github.io/duskit/docs/components/control)

## Installation

```
npm i -D @dusk-network/control
```

## Usage

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=../../../examples/src/control/Control_01.svelte) -->
<!-- The below code snippet is automatically added from ../../../examples/src/control/Control_01.svelte -->

```svelte
<script>
	import Control from "@dusk-network/control";
	import TextField from "@dusk-network/text-field";
</script>

<Control width="full" label="Control label" let:id>
	<TextField name="control_test" placeholder="A controlled text field" id="{id}" />
</Control>
```

<!-- MARKDOWN-AUTO-DOCS:END -->
