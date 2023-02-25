<script>
	import { getContext } from "svelte";
	import { number } from "svelte-i18n";
	import QuadTree from "./QuadTree.html.svelte";

	const { data, width, yScale, config } = getContext("LayerCake");

	const titleCase = (d) => d.replace(/^\w/, (w) => w.toUpperCase());
	let formatKey = (d) => titleCase(d);

	/** A y-offset from the hover point, in pixels. */
	let offset = 34;

	/** Tooltip x-offest from the hover point, in pixels, to account for the tooltip arrow */
	let leftOffset = 25;

	/** Tooltip width */
	let w;

	/**Offset to center point on chart line, in pixels*/
	let pointOffset = 4;

	/* --------------------------------------------
	 * Sort the keys by the highest value
	 */
	function sortResult(result) {
		if (Object.keys(result).length === 0) return [];
		const rows = Object.keys(result)
			.filter((d) => d !== $config.x)
			.map((key) => {
				return {
					key,
					value: result[key],
				};
			})
			.sort((a, b) => b.value - a.value);

		return rows;
	}

	/**Format timestamp to DD-MM-YYYY format*/
	function formatTime(timestamp) {
		let date = new Date(timestamp);
		let month = parseInt(date.getMonth(), 10) + 1;
		return date.getDate() + "-" + month + "-" + date.getFullYear();
	}
</script>

<QuadTree dataset="{$data}" y="x" let:x let:y let:visible let:found let:e>
	{@const foundSorted = sortResult(found)}
	{#if visible === true}
		<div
			style="left:{x - pointOffset}px; top:{$yScale(foundSorted[0].value) - pointOffset}px"
			class="duk-chart-line__dot"
		></div>
		<div
			bind:clientWidth="{w}"
			class="duk-chart__tooltip duk-chart-line__tooltip"
			style="
        width:{w}px;
        display: {visible ? 'block' : 'none'};
        top:{$yScale(foundSorted[0].value) + offset}px;
        left:{$width - x < w + leftOffset ? x - w / 2 - leftOffset : x + w / 2 + leftOffset}px;"
		>
			{#if $width - x > w + leftOffset}
				<div class="duk-chart__tooltip--arrow-left">
					<div class="duk-chart__tooltip--arrow-left-interior"></div>
				</div>
			{:else}
				<div class="duk-chart__tooltip--arrow-right">
					<div class="duk-chart__tooltip--arrow-right-interior"></div>
				</div>
			{/if}
			<div>
				<span class="duk-chart__tooltip--text">
					{formatKey($config.y)}:
					{$number(found[$config.y], {
						locale: "en",
						style: "currency",
						currency: "USD",
						maximumSignificantDigits: 4,
					})}
				</span>
			</div>
			<div>
				<span class="duk-chart__tooltip--text">
					{formatKey($config.x)}: {formatTime(found[$config.x])}
				</span>
			</div>
		</div>
	{/if}
</QuadTree>
