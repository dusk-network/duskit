<script>
	import "./styles.css";
	import variants from "@dusk-network/utilities/variants.js";

	/**
	 * Sets the variant of the step-list.
	 * @type {"brand" | "cta" | "info" | "success" | "warning" | "danger" }
	 */
	export let variant = variants.STEP_LIST.BRAND;
</script>

<div
	class="{$$props.class || ''} duk-step-list"
	class:duk-step-list--brand="{variant === variants.STEP_LIST.BRAND}"
	class:duk-step-list--cta="{variant === variants.STEP_LIST.CTA}"
	class:duk-step-list--info="{variant === variants.STEP_LIST.INFO}"
	class:duk-step-list--success="{variant === variants.STEP_LIST.SUCCESS}"
	class:duk-step-list--warning="{variant === variants.STEP_LIST.WARNING}"
	class:duk-step-list--danger="{variant === variants.STEP_LIST.DANGER}"
>
	<slot />
</div>
