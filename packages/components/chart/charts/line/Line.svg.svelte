<script>
	import { getContext } from "svelte";

	const { data, xGet, yGet } = getContext("LayerCake");

	$: path =
		"M" +
		$data
			.map((d) => {
				return $xGet(d) + "," + $yGet(d);
			})
			.join("L");
</script>

<path class="duk-chart-line__line" d="{path}"></path>
