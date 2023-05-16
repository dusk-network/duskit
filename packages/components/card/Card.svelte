<script>
	import backgroundImage from "./lib/images/background.png";

	/**
	 * Sets the background image
	 */
	export let background = false;
</script>

<div class="card" style="{background && `background-image:url(${backgroundImage})`}">
	<slot />
</div>
