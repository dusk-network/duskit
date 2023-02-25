<script>
	import { LayerCake, Svg, Html } from "layercake";

	import Heading from "@dusk-network/heading";
	import LineSvg from "./line/Line.svg.svelte";
	import Tooltip from "./line/Tooltip.html.svelte";

	export let data;

	$: filteredData = data.groups.filter((_, i) => i % 2 == 0); // Filter out ever other (odd) datapoint

	function getYDomain(groups, yKey) {
		const lowest = groups.reduce((prev, current) => {
			return prev[yKey] < current[yKey] ? prev : current;
		});

		const highest = groups.reduce((prev, current) => {
			return prev[yKey] > current[yKey] ? prev : current;
		});

		return [lowest[yKey] - lowest[yKey] * 0.1, highest[yKey] + highest[yKey] * 0.1];
	}
</script>

<div class="duk-chart duk-chart-bar-horizontal">
	<LayerCake
		data="{filteredData}"
		flatData="{filteredData}"
		padding="{{ top: 3, right: 3, bottom: 3, left: 3 }}"
		x="{data.xKey}"
		y="{data.yKey}"
		yDomain="{getYDomain(filteredData, data.yKey)}"
	>
		{#if data.title}
			<Html>
				<Heading size="sm">
					<h2>{data.title}</h2>
				</Heading>
			</Html>
		{/if}
		<Svg>
			<LineSvg />
		</Svg>
		<Html>
			<Tooltip dataset="{filteredData}" />
		</Html>
	</LayerCake>
</div>
