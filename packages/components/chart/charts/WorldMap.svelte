<script>
	// import { getContext } from 'svelte';
	import { LayerCake, ScaledSvg, Html } from "layercake";
	import { feature } from "topojson-client";
	import { geoMercator as Projection } from "d3-geo";
	import Heading from "@dusk-network/heading";
	import WorldMapSvg from "./world-map/WorldMap.svg.svelte";
	import countryData from "./world-map/data/countries.json";

	export let data;
	export let aspectRatio;
	export let mapPinRadius;

	const markers = data.markers;
	const countries = feature(countryData, countryData.objects.countries);
	const projection = Projection();
	const flatData = countries.features.map((d) => d.properties);
</script>

<div class="duk-chart duk-chart-world-map" style="padding-bottom: {100 / aspectRatio}%">
	<LayerCake ssr="{true}" data="{countries}" flatData="{flatData}" position="absolute">
		{#if data.title}
			<Html>
				<Heading size="sm">
					<h2>{data.title}</h2>
				</Heading>
			</Html>
		{/if}
		<ScaledSvg fixedAspectRatio="{aspectRatio}">
			<svelte:fragment slot="defs">
				<pattern
					id="dots"
					patternUnits="userSpaceOnUse"
					width="5"
					height="5"
					patternTransform="scale(0.1)"
				>
					<circle class="duk-chart-world-map__background-dot" r="1.25" cx="1.25" cy="1.25"></circle>
				</pattern>
				<pattern id="denseDots" xlink:href="#dots" patternTransform="scale(0.05)"></pattern>
			</svelte:fragment>
			<WorldMapSvg
				aspectRatio="{aspectRatio}"
				projection="{projection}"
				markers="{markers}"
				mapPinRadius="{mapPinRadius}"
			/>
		</ScaledSvg>
	</LayerCake>
</div>
