<script>
	import { sizes } from "@dusk-network/utilities";
</script>

<p>A list of available <code>Button</code> sizes:</p>

<ul>
	{#each Object.entries(sizes.BUTTON) as size}
		<li>{size[0]}</li>
	{/each}
</ul>
