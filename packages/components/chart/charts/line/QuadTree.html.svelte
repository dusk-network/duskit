<script>
	import { getContext } from "svelte";
	import { quadtree } from "d3-quadtree";

	const { data, xGet, yGet, width, height } = getContext("LayerCake");

	let visible = false;
	let found = {};
	let e = {};

	/** The dimension to search across when moving the mouse left and right. */
	export let x = "x";

	/** The dimension to search across when moving the mouse up and down. */
	export let y = "y";

	/** The number of pixels to search around the mouse's location. This is the third argument passed to [`quadtree.find`](https://github.com/d3/d3-quadtree#quadtree_find) and by default a value of `undefined` means an unlimited range. */
	export let searchRadius = undefined;

	/** The dataset to work off of—defaults to $data if left unset. You can pass override the default here in here in case you don't want to use the main data or it's in a strange format. */
	export let dataset = undefined;

	$: xGetter = x === "x" ? $xGet : $yGet;
	$: yGetter = y === "y" ? $yGet : $xGet;

	function findItem(evt) {
		e = evt;

		const xLayerKey = `layer${x.toUpperCase()}`;
		const yLayerKey = `layer${y.toUpperCase()}`;

		found = finder.find(evt[xLayerKey], evt[yLayerKey], searchRadius) || {};
		visible = Object.keys(found).length > 0;
	}

	$: finder = quadtree()
		.extent([
			[-1, -1],
			[$width + 1, $height + 1],
		])
		.x(xGetter)
		.y(yGetter)
		.addAll(dataset || $data);
</script>

<div
	class="duk-chart-line__quadtree"
	on:mousemove="{findItem}"
	on:mouseout="{() => (visible = false)}"
	on:blur="{() => (visible = false)}"
></div>
<slot
	x="{xGetter(found) || 0}"
	y="{yGetter(found) || 0}"
	found="{found}"
	visible="{visible}"
	e="{e}"
/>
