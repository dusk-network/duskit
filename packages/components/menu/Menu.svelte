<script>
	import { setContext, getContext } from "svelte";
	import orientations from "@dusk-network/utilities/orientations.js";
	import contexts from "@dusk-network/utilities/contexts.js";
	import "./styles.css";

	/**
	 * Sets the orientation of the Menu.
	 * @type { "horizontal" | "vertical" }
	 */
	export let orientation = orientations.MENU.VERTICAL;

	/**
	 * Sets the `id` of the Menu if set, otherwise the ID is generated.
	 * @type {string}
	 */
	export let id = "__DUK-menu" + Math.random().toString(36);

	/**
	 * Sets the `name` attribute on the Menu.
	 */
	export let name = "";

	setContext("DUK:drop-down:context", contexts.DROP_DOWN.MENU);

	const context = getContext("DUK:menu:context");
</script>

<nav
	class="{$$props.class || ''} duk-menu"
	class:duk-menu--horizontal="{orientation === orientations.MENU.HORIZONTAL}"
	class:duk-menu--vertical="{orientation === orientations.MENU.VERTICAL}"
	class:duk-menu--navbar="{context === contexts.MENU.NAVBAR}"
	class:duk-menu--footer="{context === contexts.MENU.FOOTER.BODY}"
	class:duk-menu--footer-social="{context === contexts.MENU.FOOTER.SOCIAL}"
	class:duk-menu--footer-category="{context === contexts.MENU.FOOTER.CATEGORY}"
	id="{id}"
	aria-label="{name || undefined}"
>
	<slot name="title" />
	<ul class="duk-menu__list">
		<slot />
	</ul>
</nav>
