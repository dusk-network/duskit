<script>
	import { getContext, onMount } from "svelte";
	import Heading from "@dusk-network/heading";
	import Text from "@dusk-network/text";

	export let id = "__DUK-accordion-item" + Math.random().toString(36);
	export let title = "Title";
	export let expanded = false;
	export let ref = null;
	export let dark;

	const ctx = getContext("DUK:accordion:methods");

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
	<div>
		<Heading size="x-small">{title}</Heading>
		<div
			class="duk-accordion__action"
			bind:this="{ref}"
			aria-expanded="{expanded}"
			aria-controls="{id}"
			id="{buttonId}"
			label="Toggle Accordion"
		>
			{#if expanded}
				<svg
					width="20"
					height="19"
					viewBox="0 0 20 19"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M19.088 7.74H11.384V0H8.50405V7.74H0.800049V10.62H8.50405V18.324H11.384V10.62H19.088V7.74Z"
						fill="{dark ? 'var(--colors-gray)' : 'var(--colors-smokey)'}"></path>
				</svg>
			{:else}
				<svg
					width="20"
					height="4"
					viewBox="0 0 20 4"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M19.088 0.73999H11.384L8.50405 0.739999L0.800049 0.73999V3.61999H8.50405H11.384H19.088V0.73999Z"
						fill="{dark ? 'var(--colors-gray)' : 'var(--colors-smokey)'}"></path>
				</svg>
			{/if}
		</div>
	</div>
	<div>
		<dd
			role="region"
			id="{id}"
			aria-labelledby="{buttonId}"
			hidden="{!expanded}"
			class="duk-accordion__datum"
		>
			<Text size="medium">
				<slot />
			</Text>
		</dd>
	</div>
</dt>
