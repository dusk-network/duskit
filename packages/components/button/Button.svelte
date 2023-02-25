<script>
	import { getContext } from "svelte";
	import variants from "@dusk-network/utilities/variants.js";
	// import states from "@dusk-network/utilities/states.js";
	import sizes from "@dusk-network/utilities/sizes.js";
	import contexts from "@dusk-network/utilities/contexts.js";
	import "./styles.css";

	/**
	 * Sets the `id` of the Button if set, otherwise the ID is generated.
	 * @type {string}
	 */
	export let id = "__DUSK-button" + Math.random().toString(36);

	/**
	 * Sets the variant of the Button.
	 * @type {"primary" | "secondary" | "tertiary"}
	 */
	export let variant = variants.BUTTON.PRIMARY;

	/**
	 * Sets the size of the Button.
	 * @type {"sm"}
	 */
	export let size = "";

	/**
	 * Renders the Button as an `a` tag when set.
	 */
	// TODO Investigate if this is needed.
	// export let href = "";

	/**
	 * Sets the `disabled` attribute on the Button when true.
	 */
	export let disabled = false;

	/**
	 * Sets the `aria-label` attribute on the Button
	 */
	export let label = "";

	const context = getContext("DUSK:button:context");
</script>

<button
	class="{$$props.class || ''} dusk-button"
	class:dusk-button--primary="{variant === variants.BUTTON.PRIMARY}"
	class:dusk-button--secondary="{variant === variants.BUTTON.SECONDARY}"
	class:dusk-button--tertiary="{variant === variants.BUTTON.TERTIARY}"
	class:dusk-button--small="{size === sizes.BUTTON.SMALL}"
	class:dusk-button--hero="{context === contexts.BUTTON.HERO}"
	class:dusk-button--mnemonic="{context === contexts.BUTTON.MNEMONIC}"
	class:dusk-button--heading="{context === contexts.BUTTON.HEADING}"
	class:dusk-button--group="{context === contexts.BUTTON.GROUP}"
	class:dusk-button--navbar="{context === contexts.BUTTON.NAVBAR}"
	class:dusk-button--footer="{context === contexts.BUTTON.FOOTER}"
	aria-label="{label}"
	disabled="{disabled || undefined}"
	id="{id}"
	on:click
	on:mouseover
	on:focus
>
	<slot />
</button>
