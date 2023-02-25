<script>
	import { contexts } from "@dusk-network/utilities";
</script>

<p>A list of available <code>Button</code> contexts:</p>
<ul>
	{#each Object.entries(contexts.BUTTON) as context}
		<li>{context[0]}</li>
	{/each}
</ul>
<p>
	Access a contexts directly. <code>contexts.BUTTON.HEADING</code> is "{contexts.BUTTON.HEADING}"
</p>
