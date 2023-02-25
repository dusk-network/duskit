<script>
	import Gauge from "@dusk-network/gauge";

	let minValue = 0;
	let maxValue = 20;
	let value = 5;
</script>

<div style="width:200px;">
	<Gauge minValue="{minValue}" maxValue="{maxValue}" value="{value}" />
</div>
