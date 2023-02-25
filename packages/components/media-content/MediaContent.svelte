<script>
	import "./styles.css";
	import { getContext, setContext } from "svelte";
	import contexts from "@dusk-network/utilities/contexts.js";

	/**
	 * Reverses the order of presentation
	 */
	export let reverse = false;

	/**
	 * Aligns the content
	 * @type {"left"|"center"|"right"}
	 */
	export let align = "left";

	/**
	 * Vertically aligns the content
	 * @type {"top"|"middle"|"bottom"}
	 */
	export let valign = "middle";

	const context = getContext("DUK:media-content:context");

	setContext("DUK:heading:context", contexts.HEADING.CONTENT);
	setContext("DUK:group:context", contexts.GROUP.CONTENT);
	setContext("DUK:rich-text:context", contexts.RICH_TEXT.CONTENT);
	setContext("DUK:detail-list:context", contexts.DETAIL_LIST.CONTENT);
</script>

<div
	class="{$$props.class || ''} duk-media-content"
	class:duk-media-content--reverse="{reverse === true}"
	class:duk-media-content--top="{valign === 'top'}"
	class:duk-media-content--middle="{valign === 'middle'}"
	class:duk-media-content--bottom="{valign === 'bottom'}"
	class:duk-media-content--left="{align === 'left'}"
	class:duk-media-content--center="{align === 'center'}"
	class:duk-media-content--right="{align === 'right'}"
>
	<div
		class="duk-media-content__media"
		class:duk-media-content--card="{context === contexts.MEDIA_CONTENT.CARD}"
	>
		<slot name="media" />
	</div>
	{#if $$slots.text}
		<div class="duk-media-content__text">
			<slot name="text" />
		</div>
	{/if}
</div>
