<script>
	import { setContext, onMount } from "svelte";
	import Logo from "@dusk-network/logo";
	import Button from "@dusk-network/button";
	import Menu from "./lib/components/menu";
	import { detectPageChange } from "./lib/helpers/detect-page-change.js";
	import { hidden } from "./lib/store.js";
	import "./styles.css";

	export let content;
	export let theme;
	export let padding;

	let navbar, clientWidth;

	$: navbar = content.attributes.navbar;
	$: {
		if (clientWidth >= 1024) {
			$hidden = true;
		}
	}
	$: {
		if (content.attributes.navbar.padding) {
			padding = content.attributes.navbar.padding.replace(/([p])/g, "!$&");
		} else if (padding) {
			padding = padding.replace(/([p])/g, "!$&");
		} else {
			padding = content.attributes.navbar.padding || padding;
		}
	}

	setContext("button", "button:navbar");
	setContext("logo", "logo:navbar");

	onMount(() => {
		detectPageChange(() => {
			$hidden = true;
		});
	});
</script>

<svelte:window bind:innerWidth="{clientWidth}" />
{#if content}
	<span class:dark="{theme === 'dark'}">
		<nav class="navbar {padding}" class:navbar--menu-hidden="{$hidden}">
			<div class="navbar__wrapper">
				<a href="/" class="navbar__logo">
					<Logo />
					<span class="navbar__screen-reader">DUSK</span>
				</a>
				{#if navbar}
					<button
						on:click="{() => ($hidden = !$hidden)}"
						on:keyup="{() => ($hidden = !$hidden)}"
						class="navbar__toggle"
						aria-controls="navbar-menu"
						aria-expanded="false"
					>
						<span class="navbar__screen-reader">Open main menu</span>
						{#if $hidden}
							<svg
								class="navbar__toggle-svg"
								aria-hidden="true"
								viewBox="0 0 41 14"
								xmlns="http://www.w3.org/2000/svg"
							>
								<line y1="1" x2="40.8" y2="1" stroke-width="2"></line>
								<line y1="12.9854" x2="40.8" y2="12.9854" stroke-width="2"></line>
							</svg>
						{:else}
							<svg
								class="navbar__toggle-svg"
								aria-hidden="true"
								viewBox="0 0 32 31"
								xmlns="http://www.w3.org/2000/svg"
							>
								<line x1="1.29289" y1="30.2929" x2="30.1428" y2="1.44294" stroke-width="2"></line>
								<line x1="1.70711" y1="1.29289" x2="30.5571" y2="30.1428" stroke-width="2"></line>
							</svg>
						{/if}
					</button>

					<div class="navbar__menu" class:navbar__menu--hidden="{$hidden}" id="navbar-menu">
						{#if navbar.navigation}
							<Menu navigation="{navbar.navigation}" />
						{/if}
						{#if navbar.button}
							<Button
								variant="{navbar.button.variant}"
								size="{navbar.button.size}"
								rounded="{navbar.button.rounded}"
								href="{navbar.button.href}"
							>
								{navbar.button.label}
							</Button>
						{/if}
					</div>
				{/if}
			</div>
		</nav>
	</span>
{/if}
