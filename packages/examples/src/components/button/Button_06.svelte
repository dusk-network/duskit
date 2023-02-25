<script>
	import Button from "@dusk-network/button";
	const default_slot = "Button";
	const labelLeft = "I am a label";
</script>

<Button>
	{default_slot}
	<svelte:fragment slot="labelLeft">
		{labelLeft}
	</svelte:fragment>
</Button>
