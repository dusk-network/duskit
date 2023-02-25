<script>
	import { getContext } from "svelte";
	import { variants, contexts } from "@dusk-network/utilities";
	import "./styles.css";

	/**
	 * Sets the variant of the Chip.
	 * @type {"default" | "brand" | "cta" | "info" | "success" | "warning" | "danger" }
	 */
	export let variant = variants.CHIP.DEFAULT;

	/**
	 * Sets the chip to be a badge;
	 */
	export let filled = false;

	const context = getContext("DUK:chip:context");
</script>

<div
	class="{$$props.class || ''} duk-chip"
	class:duk-chip--brand="{!filled && variant === variants.CHIP.BRAND}"
	class:duk-chip--cta="{!filled && variant === variants.CHIP.CTA}"
	class:duk-chip--info="{!filled && variant === variants.CHIP.INFO}"
	class:duk-chip--success="{!filled && variant === variants.CHIP.SUCCESS}"
	class:duk-chip--warning="{!filled && variant === variants.CHIP.WARNING}"
	class:duk-chip--danger="{!filled && variant === variants.CHIP.DANGER}"
	class:duk-chip--statistic="{context === contexts.CHIP.STATISTIC}"
	class:duk-chip--detail-list="{context === contexts.CHIP.DETAIL_LIST}"
	class:duk-chip--datum="{context === contexts.CHIP.DATUM}"
	class:duk-chip__badge="{filled}"
	class:duk-chip__badge--brand="{filled && variant === variants.CHIP.BRAND}"
	class:duk-chip__badge--success="{filled && variant === variants.CHIP.SUCCESS}"
	class:duk-chip__badge--warning="{filled && variant === variants.CHIP.WARNING}"
	class:duk-chip__badge--danger="{filled && variant === variants.CHIP.DANGER}"
>
	<div class="duk-chip__text">
		<span><slot /></span>
	</div>
</div>
