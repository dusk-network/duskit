<script>
	import { setContext } from "svelte";
	import contexts from "@dusk-network/utilities/contexts.js";
	import Logo from "@dusk-network/logo";
	import AppsMenu from "./menu/AppsMenu.svelte";
	import LinksMenu from "./menu/LinksMenu.svelte";
	import A11yMenu from "./menu/A11yMenu.svelte";
	import NetworksMenu from "./menu/NetworksMenu.svelte";
	import NavigationMenu from "./menu/NavigationMenu.svelte";
	import "./styles.css";

	/**
	 * Sets the title of application.
	 */
	export let title = "";

	/**
	 * Used to display an app menu unless `$$slots.apps` is passed.
	 */
	export let apps = [];

	/**
	 * Used to display a network menu unless `$$slots.networks` is passed.
	 */
	export let networks = [];

	/**
	 * Used to select another network than the default.
	 */
	export let selectedNetwork = "";

	/**
	 * Used to display a navigation menu unless `$$slots.navigation` is passed.
	 */
	export let navigation = [];

	/**
	 * Used to indicate the currently active path
	 */
	export let activePath = "";

	/**
	 * Used to display a menu with links unless `$$slots.links` is passed.
	 */
	export let links = [];

	/**
	 * Sets the application name.
	 */
	export let appName = "";

	/**
	 * Sets the `id` of the Navbar if set, otherwise the ID is generated.
	 * @type {string}
	 */
	export let id = "__DUK-navbar" + Math.random().toString(36);

	let expanded = false;

	setContext("DUK:menu:context", contexts.MENU.NAVBAR);
	setContext("DUK:logo:context", contexts.LOGO.NAVBAR);

	const toggleNavbar = () => {
		const navbarElement = document.querySelector(`#${id}`);
		navbarElement.classList.toggle("duk-navbar--hidden");
		expanded = !expanded;
	};
</script>

<svelte:window
	on:sveltekit:navigation-start="{() => {
		if (expanded) {
			toggleNavbar();
		}
	}}"
/>

<nav class="{$$props.class || ''} duk-navbar duk-navbar--hidden" id="{id}">
	<div class="duk-navbar__wrapper duk-navbar__wrapper--primary">
		<div class="duk-navbar__brand">
			{#if $$slots.logo}
				<slot name="logo" />
			{:else}
				<Logo href="https://dusk.network/" />
			{/if}
			{#if title}
				<h1 class="duk-navbar__heading">{title}</h1>
			{/if}
			<div class="duk-navbar__navigation duk-navbar__navigation--primary">
				{#if $$slots.networks}
					<slot name="networks" />
				{:else if networks.length !== 0}
					<NetworksMenu on:network networks="{networks}" selectedNetwork="{selectedNetwork}" />
				{/if}
				{#if $$slots.apps}
					<slot name="apps" />
				{:else if apps.length !== 0}
					<AppsMenu apps="{apps}" appName="{appName}" />
				{/if}
			</div>
		</div>
		<div class="duk-navbar__navigation duk-navbar__navigation--tertiary">
			{#if $$slots.links}
				<slot name="links" />
			{:else if links.length !== 0}
				<LinksMenu links="{links}" />
			{/if}
		</div>
		<div id="{id}-content" class="duk-navbar__collapse">
			<button
				id="{id}-navbar-toggle"
				aria-controls="{id}-content"
				aria-expanded="{expanded}"
				aria-label="Toggle navigation"
				on:click="{toggleNavbar}"
			>
				{#if !expanded}
					<svg
						class="h-[31px] w-[41px]"
						aria-hidden="true"
						fill="none"
						viewBox="0 0 41 14"
						xmlns="http://www.w3.org/2000/svg"
					>
						<line y1="1" x2="40.8" y2="1" stroke="#0F0F0F" stroke-width="2"></line>
						<line y1="12.9854" x2="40.8" y2="12.9854" stroke="#0F0F0F" stroke-width="2"></line>
					</svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
						></path></svg
					>
				{/if}
			</button>
		</div>
	</div>
	<div class="duk-navbar__wrapper duk-navbar__wrapper--secondary">
		<div class="duk-navbar__navigation duk-navbar__navigation--secondary">
			{#if $$slots.navigation}
				<slot name="navigation" />
			{:else if navigation.length !== 0}
				<NavigationMenu navigation="{navigation}" activePath="{activePath}" />
			{/if}
		</div>
		{#if $$slots.a11y}
			<slot name="a11y" />
		{:else}
			<A11yMenu on:settings />
		{/if}
	</div>
</nav>
