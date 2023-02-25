<script>
	import { getContext } from "svelte";
	import { number } from "svelte-i18n";

	const { width, height, config, yGet, yRange } = getContext("LayerCake");

	const titleCase = (d) => d.replace(/^\w/, (w) => w.toUpperCase());
	let formatKey = (d) => titleCase(d);

	export let evt = {};

	/** Tooltip x-offest from the hover point, in pixels, to account for the tooltip arrow */
	let offset = 22;

	/** Tooltip width */
	let w;

	/**Format timestamp to DD-MM-YYYY format*/
	function formatTime(timestamp) {
		let date = new Date(timestamp);
		let month = parseInt(date.getMonth(), 10) + 1;
		return date.getDate() + "-" + month + "-" + date.getFullYear();
	}

	/**Centers the tooltip relative to the bar height */
	let tooltipPosition =
		$height - (($yRange[0] - $yGet(evt.detail.props)) * $height) / $yRange[0] / 2;
</script>

{#if evt.detail.props}
	<div
		bind:clientWidth="{w}"
		class="duk-chart__tooltip duk-chart-bar-horizontal__tooltip"
		style="
        width:{w}px;
        top:{tooltipPosition}px;
        left:{$width - evt.detail.e.layerX > w + offset
			? evt.detail.e.layerX + offset
			: evt.detail.e.layerX - offset - w}px;"
	>
		{#if $width - evt.detail.e.layerX > w + offset}
			<div class="duk-chart__tooltip--arrow-left">
				<div class="duk-chart__tooltip--arrow-left-interior"></div>
			</div>
		{:else if $width - evt.detail.e.layerX < w + offset}
			<div class="duk-chart__tooltip--arrow-right">
				<div class="duk-chart__tooltip--arrow-right-interior"></div>
			</div>
		{/if}
		<div>
			<span class="duk-chart__tooltip--text">
				{formatKey($config.y)}:
				{$number(evt.detail.props[$config.y], {
					locale: "en",
					style: "currency",
					currency: "USD",
				})}
			</span>
		</div>
		<div>
			<span>
				{formatKey($config.x)}: {formatTime(evt.detail.props[$config.x])}
			</span>
		</div>
	</div>
{/if}
