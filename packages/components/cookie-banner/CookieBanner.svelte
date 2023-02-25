<script>
	import { createEventDispatcher } from "svelte";
	import Button from "@dusk-network/button";
	import Group from "@dusk-network/group";
	import "./styles.css";

	/**
	 * Sets the `id` of the Cookie Banner if set, otherwise the ID is generated.
	 * @type {string}
	 */
	export let id = "__DUK-cookie-banner" + Math.random().toString(36);

	/**
	 * Sets the accept Button text.
	 */
	export let acceptLabel;

	/**
	 * Sets the settings Button text.
	 */
	export let settingsLabel;

	/**
	 * Sets the visibility of the banner
	 */
	export let showBanner = false;

	const dispatch = createEventDispatcher();
</script>

<div id="{id}" class="duk-cookie-banner">
	{#if showBanner === true}
		<div class="{$$props.class || ''} duk-cookie-banner__banner">
			<div class="duk-cookie-banner__disclaimer">
				<slot />
			</div>
			<div class="duk-cookie-banner__controls">
				<Group align="center">
					<Button
						variant="cta"
						on:click="{() => {
							showBanner = false;
							dispatch('accept');
						}}"
						label="accept all cookies"
					>
						{acceptLabel}
					</Button>
					<Button on:click="{() => dispatch('settings')}" label="open settings">
						{settingsLabel}
					</Button>
				</Group>
			</div>
		</div>
	{/if}
</div>
