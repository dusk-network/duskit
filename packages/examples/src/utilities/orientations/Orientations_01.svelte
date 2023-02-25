<script>
	import { orientations } from "@dusk-network/utilities";
</script>

<p>A list of available <code>Menu</code> orientations:</p>

<ul>
	{#each Object.entries(orientations.MENU) as orientation}
		<li>{orientation[0]}</li>
	{/each}
</ul>
