<script>
	import Toggle from "@dusk-network/toggle";

	let value = "toggle";
	const type = "switch";
	let variant = "brand";
	let checked = false;

	function onChange() {
		//Runs on triggered event
	}
	function onClick() {
		//Runs on triggered event
	}
</script>

<Toggle
	type="{type}"
	name="switch"
	id="switch"
	variant="{variant}"
	value="{value}"
	checked="{checked}"
	onIcon="brightness-5"
	offIcon="connection"
	on:change="{onChange}"
	on:click="{onClick}"
/>
