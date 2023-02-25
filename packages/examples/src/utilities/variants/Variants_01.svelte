<script>
	import { variants } from "@dusk-network/utilities";
	import Button from "@dusk-network/button";
</script>

<p>A list of available Button variants:</p>

<ul>
	{#each Object.entries(variants.BUTTON) as variant}
		<li>{variant[0]}</li>
	{/each}
</ul>

<p>
	Access a variant directly. <code>variants.BUTTON.BRAND</code> is "{variants.BUTTON.BRAND}"
</p>
<p>Use a variant in a component:</p>

<Button variant="{variants.BUTTON.BRAND}">I am a brand variant</Button>
