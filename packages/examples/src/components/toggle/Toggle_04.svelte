<script>
	import Toggle from "@dusk-network/toggle";
	import Group from "@dusk-network/group";

	const type = "radio";
	const variant = "brand";
	function onChange() {
		//Runs on triggered event
	}
	function onClick() {
		//Runs on triggered event
	}
</script>

<Group>
	{#each Array(5) as _, i}
		<Toggle
			type="{type}"
			name="radio_group"
			id="radio_{i}"
			variant="{variant}"
			value="radio_{i}"
			on:change="{onChange}"
			on:click="{onClick}"
		>
			Example {type}
		</Toggle>
	{/each}
</Group>
