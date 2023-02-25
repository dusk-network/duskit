# Duskit - Alert

[![Storybook](https://img.shields.io/badge/Storybook-Component_Playground-%23FF4785?style=flat&logo=storybook)](https://dusk-network.github.io/duskit/?path=/story/components-atoms-alert)
[![Docs](https://img.shields.io/badge/Documentation-%235E35CF?style=flat)](https://dusk-network.github.io/duskit/docs/components/alert)

## Installation

```
npm i -D @dusk-network/alert
```

## Usage

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=../../../examples/src/alert/Alert_01.svelte) -->
<!-- The below code snippet is automatically added from ../../../examples/src/alert/Alert_01.svelte -->

```svelte
<script>
	import Alert from "@dusk-network/alert";
	import Icon from "@dusk-network/icon/Icon.svelte";
	import Button from "@dusk-network/button/Button.svelte";
	import Group from "@dusk-network/group/Group.svelte";

	function onClick() {}
	function onMouseover() {}

	let variant = "success";
	let value = true;
</script>

<Alert value="{value}" variant="{variant}" on:click="{onClick}" on:mouseover="{onMouseover}">
	<div slot="icon">
		<Icon name="check-decagram-outline" />
	</div>
	<div slot="title">Alert Title!</div>
	<p>This is an alert!</p>
	<div slot="actions">
		<Group>
			<Button variant="{variant || 'brand'}" outline="{true}" on:click="{() => (value = false)}">
				Accept
			</Button>
			<Button variant="default" outline="{true}" on:click="{() => (value = false)}">Reject</Button>
		</Group>
	</div>
</Alert>
```

<!-- MARKDOWN-AUTO-DOCS:END -->
