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

<Alert
	value="{value}"
	variant="{variant} "
	dismissable="{true}"
	on:click="{onClick}"
	on:mouseover="{onMouseover}"
>
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
