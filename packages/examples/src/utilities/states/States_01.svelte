<script>
	import { states } from "@dusk-network/utilities";
</script>

<p>A list of available <code>TextField</code> states:</p>

<ul>
	{#each Object.entries(states.TEXT_FIELD) as state}
		<li>{state[0]}</li>
	{/each}
</ul>
