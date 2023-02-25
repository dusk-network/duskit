<script>
	import { setContext, getContext } from "svelte";
	import contexts from "@dusk-network/utilities/contexts.js";
	import variants from "@dusk-network/utilities/variants.js";
	import states from "@dusk-network/utilities/states.js";
	import "./styles.css";

	/**
	 * Sets the variant of the Card.
	 * @type {"brand" | "cta" | "info" | "success" | "warning" | "danger" }
	 */
	export let variant = variants.CARD.DEFAULT;

	/**
	 * Sets the state of the Card. Only works with default variant.
	 * @type { "passed" | "error" | "danger" }
	 */
	export let state = states.CARD.DEFAULT;

	/**
	 * Renders the Card as an `a` tag when set.
	 */
	export let href = "";

	/**
	 * Sets the `disabled` attribute on the Card when true.
	 */
	export let disabled = false;

	/**
	 * Sets the `overflow hidden` attribute on the Card when true.
	 */
	export let overflow = false;

	const context = getContext("DUK:card:context");

	setContext("DUK:accordion:context", contexts.ACCORDION.CARD);
	setContext("DUK:rich-text:context", contexts.RICH_TEXT.CARD);
	setContext("DUK:heading:context", contexts.HEADING.CARD);
	setContext("DUK:mnemonic:context", contexts.MNEMONIC.CARD);
	setContext("DUK:wizard:context", contexts.WIZARD.CARD);
	setContext("DUK:content:context", contexts.CONTENT.CARD);
	setContext("DUK:media-content:context", contexts.MEDIA_CONTENT.CARD);
	setContext("DUK:breadcrumb:context", contexts.BREADCRUMB.CARD);
	setContext("DUK:detail-list:context", contexts.DETAIL_LIST.CARD);
</script>

{#if href}
	<a href="{href}">
		<div
			class="{$$props.class || ''} duk-card"
			class:duk-card--group="{context === contexts.CARD.GROUP}"
			class:duk-card--brand="{variant === variants.CARD.BRAND}"
			class:duk-card--cta="{variant === variants.CARD.CTA}"
			class:duk-card--info="{variant === variants.CARD.INFO}"
			class:duk-card--success="{variant === variants.CARD.SUCCESS}"
			class:duk-card--warning="{variant === variants.CARD.WARNING}"
			class:duk-card--danger="{variant === variants.CARD.DANGER}"
			class:duk-card--passed="{state === states.CARD.PASSED}"
			class:duk-card--error="{state === states.CARD.ERROR}"
			class:duk-card--failed="{state === states.CARD.FAILED}"
			class:duk-card--disabled="{disabled}"
			class:duk-card--overflow="{overflow}"
			on:*
		>
			<slot />
		</div>
	</a>
{:else}
	<div
		class="{$$props.class || ''} duk-card"
		class:duk-card--group="{context === contexts.CARD.GROUP}"
		class:duk-card--brand="{variant === variants.CARD.BRAND}"
		class:duk-card--cta="{variant === variants.CARD.CTA}"
		class:duk-card--info="{variant === variants.CARD.INFO}"
		class:duk-card--success="{variant === variants.CARD.SUCCESS}"
		class:duk-card--warning="{variant === variants.CARD.WARNING}"
		class:duk-card--danger="{variant === variants.CARD.DANGER}"
		class:duk-card--passed="{state === states.CARD.PASSED}"
		class:duk-card--error="{state === states.CARD.ERROR}"
		class:duk-card--failed="{state === states.CARD.FAILED}"
		class:duk-card--disabled="{disabled}"
		class:duk-card--overflow="{overflow}"
		on:*
	>
		<slot />
	</div>
{/if}
