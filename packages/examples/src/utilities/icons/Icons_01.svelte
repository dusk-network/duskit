<script>
	import { icons } from "@dusk-network/utilities";
	import Icon from "@dusk-network/icon";
</script>

<p>A list of available icons:</p>

<ul>
	{#each Object.entries(icons) as icon}
		<li>{icon[0]}</li>
	{/each}
</ul>

<p>Use an icon:</p>

<Icon name="{icons.DUSK_TICKER}" />
