<script>
	export let href = undefined;
	export let active = false;
	export let external = false;
</script>

<li
	class="{$$props.class || ''} duk-menu__item"
	class:duk-menu__item--active="{active}"
	on:click
	on:mouseover
	on:focus
	on:keypress
>
	{#if href}
		<a
			href="{href}"
			rel="{external ? 'external' : null}"
			class="duk-menu__item-wrapper"
			class:duk-menu__item-wrapper--active="{active}"
		>
			<slot />
		</a>
		<slot name="menu" />
	{:else}
		<span class="duk-menu__item-wrapper"><slot /></span>
	{/if}
</li>
