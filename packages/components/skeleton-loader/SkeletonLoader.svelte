<script>
	// FIXME This needs to be mobile first and support sm, md and lg screens.
	import "./styles.css";
	import variants from "@dusk-network/utilities/variants.js";

	/**
	 * Sets the variant of the Address.
	 * @type {"brand" | "cta" | "info" | "default" | "success" | "warning" | "danger" }
	 */
	export let variant;

	/**
	 * Sets the height of the skeleton loader on an extra small screen in pixels.
	 * @type {number}
	 */
	export let extraSmallScreenHeight;

	/**
	 * Sets the height of the skeleton loader on a small screen in pixels.
	 * @type {number}
	 */
	export let smallScreenHeight;

	/**
	 * Sets the height of the skeleton loader on a medium screen in pixels.
	 * @type {number}
	 */
	export let mediumScreenHeight;

	/**
	 * Sets the height of the skeleton loader on a large screen in pixels.
	 * @type {number}
	 */
	export let largeScreenHeight;

	/**
	 * Sets the height of the skeleton loader on an extra large screen in pixels.
	 * @type {number}
	 */
	export let extraLargeScreenHeight;

	/**
	 * Sets the height of the skeleton loader on a jumbo screen in pixels.
	 */
	export let jumboScreenHeight;

	/**
	 * Sets the width of the skeleton loader.
	 */
	export let width = "100%";

	/**
	 * Sets the animation type to pulse when true.
	 */
	export let pulse = false;

	/**
	 * Sets corners to be rounded when true.
	 */
	export let rounded = false;
</script>

<div
	class="{$$props.class || ''} duk-skeleton-loader"
	class:duk-skeleton-loader--pulse="{pulse === true}"
	class:duk-skeleton-loader--rounded="{rounded === true}"
	class:duk-skeleton-loader--loader="{pulse === false}"
	class:duk-skeleton-loader--brand="{variant === variants.SKELETON_LOADER.BRAND}"
	class:duk-skeleton-loader--cta="{variant === variants.SKELETON_LOADER.CTA}"
	class:duk-skeleton-loader--info="{variant === variants.SKELETON_LOADER.INFO}"
	class:duk-skeleton-loader--success="{variant === variants.SKELETON_LOADER.SUCCESS}"
	class:duk-skeleton-loader--warning="{variant === variants.SKELETON_LOADER.WARNING}"
	class:duk-skeleton-loader--danger="{variant === variants.SKELETON_LOADER.DANGER}"
>
	<div class="duk-skeleton-loader__wrapper">
		<div
			style="--xs-height:{extraSmallScreenHeight};--sm-height:{smallScreenHeight};--md-height:{mediumScreenHeight};--lg-height:{largeScreenHeight};--xl-height:{extraLargeScreenHeight};--jumbo-height:{jumboScreenHeight};width:{width}"
			class="duk-skeleton-loader__placeholder"
		></div>
	</div>
</div>
