<script>
	import Button from "@dusk-network/button";
	const default_slot = "Button";
	const labelRight = "I am a label";
</script>

<Button variant="danger">
	{default_slot}
	<svelte:fragment slot="labelRight">
		{labelRight}
	</svelte:fragment>
</Button>
