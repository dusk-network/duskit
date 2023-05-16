<script>
	import BaseButton from "./lib/components/button";

	export let variant = "primary";
	export let size = "large";
	export let icon = undefined;
	export let active = false;
	export let circular = false;
	export let href = "";
	export let theme;
	export let type;

	const props = {
		variant,
		size,
		icon,
		active,
		circular,
		href,
		theme,
		type,
	};
</script>

{#if href.length > 0}
	<form action="{props.href}">
		<BaseButton {...props} on:click on:keyup on:mouseover on:focus>
			<slot />
		</BaseButton>
	</form>
{:else}
	<BaseButton {...props} type="{type}" on:click on:keyup on:mouseover on:focus>
		<slot />
	</BaseButton>
{/if}
