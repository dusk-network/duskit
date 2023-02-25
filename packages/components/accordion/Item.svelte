<script>
	import { getContext, setContext, onMount } from "svelte";
	import sizes from "@dusk-network/utilities/sizes.js";
	import contexts from "@dusk-network/utilities/contexts.js";
	import Button from "@dusk-network/button";

	export let id = "__DUK-accordion-item" + Math.random().toString(36);
	export let title = "Title";
	export let expanded = false;
	export let disabled = false;
	export let ref = null;

	const size = sizes.ACCORDION.LARGE;
	const ctx = getContext("DUK:accordion:methods");

	setContext("DUK:button:context", contexts.BUTTON.ACCORDION);

	let unsubscribe = undefined;

	onMount(() => {
		return () => {
			if (ctx) ctx.remove({ id });
			if (unsubscribe) unsubscribe();
		};
	});

	function handleToggle() {
		if (ctx) {
			ctx.toggle({ id, expanded: !expanded });
		}
	}

	$: buttonId = `button-${id}`;
	$: if (ctx) {
		ctx.add({ id, expanded });
		unsubscribe = ctx.items.subscribe((value) => {
			expanded = value[id];
		});
	}
</script>

<dt
	data-accordion-item
	class="duk-accordion__term"
	on:click="{handleToggle}"
	on:keypress="{handleToggle}"
>
	<Button
		bind:this="{ref}"
		aria-expanded="{expanded}"
		aria-controls="{id}"
		aria-disabled="{disabled}"
		disabled="{disabled}"
		id="{buttonId}"
		circle="{true}"
		size="{size}"
		label="Toggle Accordion"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
			><path fill="currentColor" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6h-2Z"></path></svg
		>
	</Button>
	<slot name="title">{title}</slot>
</dt>
<dd
	role="region"
	id="{id}"
	aria-labelledby="{buttonId}"
	hidden="{!expanded}"
	class="duk-accordion__datum"
>
	<slot />
</dd>
