<script>
	import Slider from "@dusk-network/slider";

	let value;
</script>

<Slider min="{0}" max="{100}" on:slide="{(event) => (value = event.detail)}" />
<p>{value}</p>
