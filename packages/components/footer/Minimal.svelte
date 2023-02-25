<script>
	import { setContext } from "svelte";
	import contexts from "@dusk-network/utilities/contexts.js";
	import Logo from "@dusk-network/logo";
	import LegalMenu from "./menu/LegalMenu.svelte";
	import SocialMediaMenu from "./menu/SocialMediaMenu.svelte";

	export let copyright;
	export let social;

	setContext("DUK:logo:context", contexts.LOGO.FOOTER);
</script>

<div class="duk-footer__minimal" {...$$restProps}>
	<Logo href="https://dusk.network" />
	<p class="duk-footer__copyright">{copyright}</p>
	<LegalMenu orientation="horizontal" />
	{#if social}
		<SocialMediaMenu orientation="horizontal" social="{social}" />
	{/if}
</div>
