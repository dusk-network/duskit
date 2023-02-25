<script>
	export let href = undefined;
</script>

<li class="{$$props.class || ''} duk-breadcrumb__item" on:click on:mouseover on:focus on:keypress>
	{#if href}
		<a href="{href}">
			<slot />
		</a>
	{:else}
		<slot />
	{/if}
</li>
