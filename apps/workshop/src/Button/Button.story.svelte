<script>
	import { setContext, getContext } from "svelte";
	import { writable } from "svelte/store";
	import { logEvent } from "histoire/client";
	import Button from "@dusk-network/button";
	import variants from "@dusk-network/utilities/variants.js";
	// import states from "@dusk-network/utilities/states.js";
	import sizes from "@dusk-network/utilities/sizes.js";
	// import contexts from "@dusk-network/utilities/contexts.js";

	export let Hst;

	let disabled = false;
	let size = sizes.BUTTON.DEFAULT;

	$: properties = { disabled, size };
</script>

<Hst.Story title="Button" group="components">
	{#each Object.values(variants.BUTTON) as variant}
		<Hst.Variant title="{variant}">
			<Button
				variant="{variant}"
				disabled="{disabled}"
				size="{size}"
				on:click="{(event) => logEvent('click', event)}"
			>
				Click me!
			</Button>
		</Hst.Variant>
	{/each}

	<svelte:fragment slot="controls">
		<Hst.Checkbox bind:value="{disabled}" title="Disabled" />
		<Hst.Select bind:value="{size}" options="{Object.values(sizes.BUTTON)}" title="Size" />
		<!-- <Hst.Select bind:value="{context}" options="{Object.values(contexts.BUTTON)}" title="Context" /> -->
		<br />
		<hr />
		<br />
		<Hst.Json bind:value="{properties}" title="Current Props" />
	</svelte:fragment>
</Hst.Story>
