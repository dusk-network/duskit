<script>
	import { getContext } from "svelte";
	import variants from "@dusk-network/utilities/variants.js";
	import contexts from "@dusk-network/utilities/contexts.js";
	import "./styles.css";

	/**
	 * Sets the variant of the Progress Bar.
	 * @type {"brand" | "cta" | "info" | "success" | "warning" | "danger" }
	 */
	export let variant = variants.PROGRESS_BAR.SUCCESS;

	/**
	 * Sets the number of steps the progress bar will have.
	 * @type {!number}
	 */
	export let steps = 2;

	/**
	 * Sets the initial step for the progress bar when rendered.
	 * @type {!number}
	 */
	export let step = 1;

	$: styles = (step * 100) / steps;

	const context = getContext("DUK:progress-bar:context");
</script>

<div
	class="{$$props.class || ''} duk-progress-bar"
	class:duk-progress-bar--brand="{variant === variants.PROGRESS_BAR.BRAND}"
	class:duk-progress-bar--cta="{variant === variants.PROGRESS_BAR.CTA}"
	class:duk-progress-bar--info="{variant === variants.PROGRESS_BAR.INFO}"
	class:duk-progress-bar--success="{variant === variants.PROGRESS_BAR.SUCCESS}"
	class:duk-progress-bar--warning="{variant === variants.PROGRESS_BAR.WARNING}"
	class:duk-progress-bar--danger="{variant === variants.PROGRESS_BAR.DANGER}"
	class:duk-progress-bar--wizard="{context === contexts.PROGRESS_BAR.WIZARD}"
	class:duk-progress-bar--password-strength="{context === contexts.PROGRESS_BAR.PASSWORD_STRENGTH}"
>
	<div class="duk-progress-bar__wrapper">
		<div style="width:{styles}%" class="duk-progress-bar__step"></div>
	</div>
</div>
