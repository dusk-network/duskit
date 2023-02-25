<script>
	import { getContext, setContext } from "svelte";
	import { marked } from "marked";
	import contexts from "@dusk-network/utilities/contexts.js";
	import sizes from "@dusk-network/utilities/sizes.js";
	import "./styles.css";

	/**
	 * If set, this string will be parsed as Markdown and rendered as HTML.
	 * @type {?string}
	 */
	export let markdown = null;

	/**
	 * Sets the size of the Rich Text.
	 * @type {"sm" | "lg" | "xl" | "xxl"}
	 */
	export let size = sizes.RICH_TEXT.DEFAULT;

	/**
	 * Sets the alignment of the Rich Text.
	 * @type {"left" | "center" | "right" }
	 */
	export let align = "left";

	const context = getContext("DUK:rich-text:context");

	setContext("DUK:accordion:context", contexts.ACCORDION.RICH_TEXT);

	if (markdown) {
		const renderer = new marked.Renderer();
		const linkRenderer = renderer.link;
		renderer.link = (href, title, text) => {
			const html = linkRenderer.call(renderer, href, title, text);
			return html.replace(/^<a /, '<a rel="external nofollow" ');
		};
		marked.use({ renderer });
	}
</script>

<div
	class="{$$props.class || ''} duk-rich-text"
	class:duk-rich-text--small="{size === sizes.RICH_TEXT.SMALL}"
	class:duk-rich-text--large="{size === sizes.RICH_TEXT.LARGE}"
	class:duk-rich-text--xl="{size === sizes.RICH_TEXT.XL}"
	class:duk-rich-text--xxl="{size === sizes.RICH_TEXT.XXL}"
	class:duk-rich-text--hero="{context === contexts.RICH_TEXT.HERO}"
	class:duk-rich-text--card="{context === contexts.RICH_TEXT.CARD}"
	class:duk-rich-text--content="{context === contexts.RICH_TEXT.CONTENT}"
	class:duk-rich-text--detail-list="{context === contexts.RICH_TEXT.DETAIL_LIST}"
	class:duk-rich-text--left="{align === 'left'}"
	class:duk-rich-text--center="{align === 'center'}"
	class:duk-rich-text--right="{align === 'right'}"
>
	{#if markdown}
		{@html marked.parse(markdown)}
	{:else}
		<slot />
	{/if}
</div>
