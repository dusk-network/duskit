<script>
	import { getContext, createEventDispatcher } from "svelte";

	const { data, xGet, yGet, yRange } = getContext("LayerCake");

	const dispatch = createEventDispatcher();

	$: columnHeight = (d) => {
		return $yRange[0] - $yGet(d);
	};
</script>

<g on:mouseout="{() => dispatch('mouseout')}" on:blur="{() => dispatch('mouseout')}">
	{#each $data as d, i}
		<rect
			class="duk-chart-bar-horizontal__bar"
			data-id="{i}"
			rx="0.6"
			x="{$xGet(d)}"
			y="{$yGet(d)}"
			width="0.6"
			height="{columnHeight(d)}"
			stroke-width="{0.6}"
			on:mouseover="{(e) => dispatch('mousemove', { e, props: d })}"
			on:focus="{(e) => dispatch('mousemove', { e, props: d })}"
			on:click="{(e) => dispatch('click', { e, props: d })}"
			on:keypress="{(e) => dispatch('keypress', { e, props: d })}"></rect>
	{/each}
</g>
