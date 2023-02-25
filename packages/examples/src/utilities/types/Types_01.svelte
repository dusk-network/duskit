<script>
	import { types } from "@dusk-network/utilities";
</script>

<p>A list of available <code>TextField</code> types:</p>

<ul>
	{#each Object.entries(types.TEXT_FIELD) as type}
		<li>{type[0]}</li>
	{/each}
</ul>
