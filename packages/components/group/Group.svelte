<script>
	import { getContext, setContext } from "svelte";
	import contexts from "@dusk-network/utilities/contexts.js";
	import "./styles.css";

	/**
	 * Sets the alignment of the Group.
	 * @type {"left" | "center" | "right" | "around" | "between" | "evenly"}
	 */
	export let align = "left";

	/**
	 * Sets the Group to use a Grid layout.
	 */
	export let grid = false;

	const context = getContext("DUK:group:context");

	setContext("DUK:button:context", contexts.BUTTON.GROUP);
	setContext("DUK:icon:context", contexts.ICON.GROUP);
	setContext("DUK:card:context", contexts.CARD.GROUP);
</script>

<div
	class="{$$props.class || ''} duk-group"
	class:duk-group--heading="{context === contexts.GROUP.HEADING}"
	class:duk-group--content="{context === contexts.GROUP.CONTENT}"
	class:duk-group--form="{context === contexts.GROUP.FORM}"
	class:duk-group--left="{align === 'left'}"
	class:duk-group--center="{align === 'center'}"
	class:duk-group--right="{align === 'right'}"
	class:duk-group--around="{align === 'around'}"
	class:duk-group--between="{align === 'between'}"
	class:duk-group--evenly="{align === 'evenly'}"
	class:duk-group--grid="{grid}"
>
	{#if $$slots.labelLeft}
		<span class="duk-group__label">
			<slot name="labelLeft" />
		</span>
	{/if}
	<slot />
	{#if $$slots.labelRight}
		<span class="duk-group__label">
			<slot name="labelRight" />
		</span>
	{/if}
</div>
