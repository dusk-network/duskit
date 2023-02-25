<script>
	import Toggle from "@dusk-network/toggle";

	let value = "test";
	const type = "checkbox";
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
	name="checkbox"
	id="checkbox"
	variant="{variant}"
	value="{value}"
	checked="{checked}"
	on:change="{onChange}"
	on:click="{onClick}"
>
	Example {type}
</Toggle>
