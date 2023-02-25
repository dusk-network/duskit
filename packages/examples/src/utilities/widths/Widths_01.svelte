<script>
	import { widths } from "@dusk-network/utilities";
</script>

<p>A list of available <code>Control</code> widths:</p>

<ul>
	{#each Object.entries(widths.CONTROL) as width}
		<li>{width[0]}</li>
	{/each}
</ul>
