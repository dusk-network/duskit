<script>
	import { setContext } from "svelte";
	import contexts from "@dusk-network/utilities/contexts.js";
	import types from "@dusk-network/utilities/types.js";
	import Minimal from "./Minimal.svelte";
	import Maximal from "./Maximal.svelte";
	import "./styles.css";

	/**
	 * Sets the variant of the Button.
	 * @type {"maximal" | "minimal" }
	 */
	export let type = types.FOOTER.MINIMAL;

	/**
	 * Sets the object used to define the social icons and their links.
	 */
	export let social;

	/**
	 * Sets the object used to define the sitemap and it's links.
	 */
	export let categories = undefined;

	setContext("DUK:menu:context", contexts.MENU.FOOTER.BODY);

	let today = new Date();
	let year = today.getFullYear();
	const copyright = `© 2018 - ${year} Dusk Network B.V. All Rights Reserved.`;
</script>

<footer class="{$$props.class || ''} duk-footer">
	{#if type === types.FOOTER.MAXIMAL}
		<Maximal categories="{categories}" />
	{/if}
	<Minimal copyright="{copyright}" social="{social}" />
</footer>
