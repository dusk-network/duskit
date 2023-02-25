<script>
	import variants from "@dusk-network/utilities/variants.js";
	import types from "@dusk-network/utilities/types.js";
	import "./styles.css";

	/**
	 * Sets the variant of the CTA List.
	 * @type {"brand" | "cta" | "info" | "success" | "warning" | "danger" }
	 */
	export let variant = variants.CTA_LIST.BRAND;

	/**
	 * Sets the type of the CTA List.
	 * @type {"ordered" | "unordered" }
	 */
	export let type = types.CTA_LIST.ORDERED;
</script>

{#if type === types.CTA_LIST.ORDERED}
	<ol
		class="{$$props.class || ''} duk-cta-list"
		class:duk-cta-list--ordered="{type === types.CTA_LIST.ORDERED}"
		class:duk-cta-list--brand="{variant === variants.CTA_LIST.BRAND}"
		class:duk-cta-list--cta="{variant === variants.CTA_LIST.CTA}"
		class:duk-cta-list--info="{variant === variants.CTA_LIST.INFO}"
		class:duk-cta-list--success="{variant === variants.CTA_LIST.SUCCESS}"
		class:duk-cta-list--warning="{variant === variants.CTA_LIST.WARNING}"
		class:duk-cta-list--danger="{variant === variants.CTA_LIST.DANGER}"
	>
		<slot />
	</ol>
{:else if type === types.CTA_LIST.UNORDERED}
	<ul
		class="{$$props.class || ''} duk-cta-list"
		class:duk-cta-list--unordered="{type === types.CTA_LIST.UNORDERED}"
	>
		<slot />
	</ul>
{:else}
	<ul class="{$$props.class || ''} duk-cta-list">
		<slot />
	</ul>
{/if}
