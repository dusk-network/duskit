<script>
	import { getContext } from "svelte";
	import Icon from "@iconify/svelte";
	import "./styles.css";

	export let variant = "primary";
	export let size = "large";
	export let icon = undefined;
	export let active = false;
	export let circular = false;
	export let href = "";
	export let type;
	export let theme;

	const context = getContext("button");
</script>

<span class:dark="{theme === 'dark'}">
	<button
		type="{(href.length && 'submit') || type || 'button'}"
		class="{$$props.class || ''} button"
		class:button--navbar="{context === 'button:navbar'}"
		class:button--footer="{context === 'button:footer'}"
		class:button--large="{size === 'large'}"
		class:button--small="{size === 'small'}"
		class:button--active="{active}"
		class:button--circular="{circular}"
		class:button--primary="{variant === 'primary'}"
		class:button--secondary="{variant === 'secondary'}"
		class:button--tertiary="{variant === 'tertiary'}"
		class:button--text="{variant === 'text'}"
		class:button--icon="{icon !== undefined}"
		on:click
		on:keyup
		on:mouseover
		on:focus
		disabled="{$$props.disabled}"
	>
		<slot />
		<slot name="icon">
			<Icon icon="{icon}" />
		</slot>
	</button>
</span>
