<script>
	import "./styles.css";
	import { widths } from "@dusk-network/utilities";
	import { getContext } from "svelte";
	import contexts from "@dusk-network/utilities/contexts.js";

	/**
	 * Sets the width of the component inside current container.
	 * @type { "max" | "three-quarters" | "half" | "quarter" | "one-third"}
	 */
	export let width = widths.TRUNCATE_TEXT.HALF;

	/**
	 * Sets title attribute of the truncated text.
	 */
	export let title = "";

	/**
	 * Sets the truncate method to js slice and removes css truncate.
	 */
	export let text = "";

	let ratio;
	switch (width) {
		case widths.TRUNCATE_TEXT.QUARTER:
			ratio = 4;
			break;
		case widths.TRUNCATE_TEXT.ONE_THIRD:
			ratio = 3;
			break;
		case widths.TRUNCATE_TEXT.HALF:
			ratio = 2;
			break;
		case widths.TRUNCATE_TEXT.THREE_QUARTERS:
			ratio = 0.75;
			break;
		default:
			ratio = 2;
	}

	$: truncateText = text.slice(0, text.length / ratio) + "...";

	const context = getContext("DUK:truncate-text:context");
</script>

<div
	class="{$$props.class || ''} duk-truncate-text"
	class:duk-truncate-text--quarter="{width === widths.TRUNCATE_TEXT.QUARTER}"
	class:duk-truncate-text--one-third="{width === widths.TRUNCATE_TEXT.ONE_THIRD}"
	class:duk-truncate-text--half="{width === widths.TRUNCATE_TEXT.HALF}"
	class:duk-truncate-text--three-quarters="{width === widths.TRUNCATE_TEXT.THREE_QUARTERS}"
	class:duk-truncate-text--max="{width === widths.TRUNCATE_TEXT.MAX}"
	class:duk-truncate-text--datum="{context === contexts.TRUNCATE_TEXT.DATUM}"
	class:duk-truncate-text--slice="{text.length > 0}"
>
	<span title="{title}" class="duk-truncate-text__value">
		{#if text.length > 0}
			{truncateText}
		{:else}
			<slot />
		{/if}
	</span>
</div>
