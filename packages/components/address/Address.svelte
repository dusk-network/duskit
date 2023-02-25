<script>
	import { getContext } from "svelte";
	import variants from "@dusk-network/utilities/variants.js";
	import contexts from "@dusk-network/utilities/contexts.js";
	import "./styles.css";

	/**
	 * Sets the variant of the Address.
	 * @type {"brand" | "cta" | "info" | "default" | "success" | "warning" | "danger" }
	 */
	export let variant;

	const context = getContext("DUK:address:context");
</script>

<div
	class="{$$props.class || ''} duk-address"
	class:duk-address--brand="{variant === variants.ADDRESS.BRAND}"
	class:duk-address--cta="{variant === variants.ADDRESS.CTA}"
	class:duk-address--info="{variant === variants.ADDRESS.INFO}"
	class:duk-address--success="{variant === variants.ADDRESS.SUCCESS}"
	class:duk-address--warning="{variant === variants.ADDRESS.WARNING}"
	class:duk-address--danger="{variant === variants.ADDRESS.DANGER}"
	class:duk-address--content="{context === contexts.ADDRESS.CONTENT}"
>
	<slot />
</div>
