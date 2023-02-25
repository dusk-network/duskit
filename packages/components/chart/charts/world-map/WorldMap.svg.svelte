<script>
	import { getContext } from "svelte";
	import { geoPath } from "d3-geo";

	const { data, height, width } = getContext("LayerCake");

	export let projection;
	export let aspectRatio;
	export let features = $data.features;
	export let markers;
	export let mapPinRadius;

	$: fitSizeRange = aspectRatio ? [100, 100 / aspectRatio] : [$width, $height];
	$: projectionFn = projection
		.fitSize(fitSizeRange, $data)
		.scale(18)
		.center([0, 30])
		.rotate([0, 0]);
	$: path = geoPath(projectionFn);
</script>

<g>
	{#each features as feature}
		<path d="{path(feature)}" style="fill: url(#dots)"></path>
	{/each}
</g>
<g>
	{#each markers as marker}
		<g
			data-tooltip="{marker.count}"
			transform="translate ({projectionFn([marker.long, marker.lat])[0]}, {projectionFn([
				marker.long,
				marker.lat,
			])[1]})"
		>
			<circle class="duk-chart-world-map__marker-background" r="{mapPinRadius}"></circle>
			<circle class="duk-chart-world-map__marker-foreground" r="{{ mapPinRadius } - 0.1}">
				<title>{marker.count}</title>
			</circle>
		</g>
	{/each}
</g>
