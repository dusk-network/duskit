<script>
	import variants from "@dusk-network/utilities/variants.js";
	import contexts from "@dusk-network/utilities/contexts.js";
	import { getContext } from "svelte";
	import "./styles.css";

	/**
	 * Sets the variant of the Loading Indicator.
	 * @type {"brand" | "cta" | "info" | "success" | "warning" | "danger" }
	 */
	export let variant = variants.LOADING_INDICATOR.DEFAULT;

	/**
	 * Sets the duration of the Loading Indicator animation cycle.
	 */
	export let duration = "1.3s";

	let context = getContext("DUK:loading-indicator:context");
</script>

<div
	class="{$$props.class || ''} duk-loading-indicator"
	class:duk-loading-indicator--brand="{variant === variants.LOADING_INDICATOR.BRAND}"
	class:duk-loading-indicator--cta="{variant === variants.LOADING_INDICATOR.CTA}"
	class:duk-loading-indicator--info="{variant === variants.LOADING_INDICATOR.INFO}"
	class:duk-loading-indicator--success="{variant === variants.LOADING_INDICATOR.SUCCESS}"
	class:duk-loading-indicator--warning="{variant === variants.LOADING_INDICATOR.WARNING}"
	class:duk-loading-indicator--danger="{variant === variants.LOADING_INDICATOR.DANGER}"
	class:duk-loading-indicator--datum="{context === contexts.LOADING_INDICATOR.DATUM}"
	class:duk-loading-indicator--heading="{context === contexts.LOADING_INDICATOR.HEADING}"
>
	<svg
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		viewBox="0 0 100 100"
		enable-background="new 0 0 100 100"
		xml:space="preserve"
	>
		<rect fill="none" stroke="currentColor" stroke-width="4" x="25" y="25" width="50" height="50">
			<animateTransform
				attributeName="transform"
				dur="0.5s"
				from="0 50 50"
				to="180 50 50"
				type="rotate"
				id="strokeBox"
				attributeType="XML"
				begin="rectBox.end"></animateTransform>
		</rect>
		<rect x="27" y="27" fill="currentColor" width="46" height="50">
			<animate
				attributeName="height"
				dur="{duration}"
				attributeType="XML"
				from="50"
				to="0"
				id="rectBox"
				fill="freeze"
				begin="0s;strokeBox.end"></animate>
		</rect>
	</svg>
</div>
