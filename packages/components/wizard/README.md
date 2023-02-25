# Duskit - Wizard

[![Storybook](https://img.shields.io/badge/Storybook-Component_Playground-%23FF4785?style=flat&logo=storybook)](https://dusk-network.github.io/duskit/?path=/story/components-atoms-wizard)
[![Docs](https://img.shields.io/badge/Documentation-%235E35CF?style=flat)](https://dusk-network.github.io/duskit/docs/components/wizard)

## Installation

```
npm i -D @dusk-network/wizard
```

## Usage

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=../../../examples/src/wizard/Wizard_01.svelte) -->
<!-- The below code snippet is automatically added from ../../../examples/src/wizard/Wizard_01.svelte -->

```svelte
<script>
	import Wizard, { Step } from "@dusk-network/wizard";
	import Button from "@dusk-network/button";
</script>

<Wizard stepCount="{2}">
	<h3 slot="title">Wizard title</h3>
	<Step number="{1}" let:next>
		step 1
		<Button on:click="{next}">Next</Button>
	</Step>
	<Step number="{2}" let:previous>
		step 2
		<Button on:click="{previous}">Back</Button>
	</Step>
</Wizard>
```

<!-- MARKDOWN-AUTO-DOCS:END -->
