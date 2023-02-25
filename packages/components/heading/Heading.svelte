<script>
	import { getContext, setContext } from "svelte";
	import contexts from "@dusk-network/utilities/contexts.js";
	import variants from "@dusk-network/utilities/variants.js";
	import sizes from "@dusk-network/utilities/sizes.js";
	import "./styles.css";

	/**
	 * Sets the size of the Heading.
	 * @type {"sm" | "lg" }
	 */
	export let size = sizes.HEADING.DEFAULT;

	/**
	 * Sets the variant of the Heading.
	 * @type { "success" | "warning" | "danger" }
	 */
	export let variant = variants.HEADING.DEFAULT;

	/**
	 * Sets the alignment of the Heading.
	 * @type { "left" | "center" | "right" }
	 */
	export let align = "left";

	const context = getContext("DUK:heading:context");

	setContext("DUK:icon:context", contexts.ICON.HEADING);
	setContext("DUK:loading-indicator:context", contexts.LOADING_INDICATOR.HEADING);
	setContext("DUK:button:context", contexts.BUTTON.HEADING);
	setContext("DUK:group:context", contexts.GROUP.HEADING);
</script>

<div
	class="{$$props.class || ''} duk-heading"
	class:duk-heading--card="{context === contexts.HEADING.CARD}"
	class:duk-heading--hero="{context === contexts.HEADING.HERO}"
	class:duk-heading--content="{context === contexts.HEADING.CONTENT}"
	class:duk-heading--disclaimer-list="{context === contexts.HEADING.DISCLAIMER_LIST}"
	class:duk-heading--datum="{context === contexts.HEADING.DATUM}"
	class:duk-heading--small="{size === sizes.HEADING.SMALL}"
	class:duk-heading--large="{size === sizes.HEADING.LARGE}"
	class:duk-heading--success="{variant === variants.HEADING.SUCCESS}"
	class:duk-heading--warning="{variant === variants.HEADING.WARNING}"
	class:duk-heading--danger="{variant === variants.HEADING.DANGER}"
	class:duk-heading--left="{align === 'left'}"
	class:duk-heading--center="{align === 'center'}"
	class:duk-heading--right="{align === 'right'}"
>
	<slot name="icon" />
	<slot />
	<slot name="help" />
	<slot name="button" />
</div>
