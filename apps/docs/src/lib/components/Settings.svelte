<style lang="postcss">
	.duk-docs-settings {
		@apply fixed bottom-0 left-0 z-50 flex h-screen w-screen items-center justify-center;

		backdrop-filter: blur(2px);

		& > .duk-card {
			@apply w-max;

			& > .duk-heading {
				@apply !justify-between;
			}

			& > .duk-content {
				.duk-group:last-child {
					@apply pt-5;
				}
			}
		}
	}
</style>

<script>
	import { onMount } from "svelte";
	import Button from "@dusk-network/button";
	import Content from "@dusk-network/content";
	import Heading from "@dusk-network/heading";
	import RichText from "@dusk-network/rich-text";
	import Control from "@dusk-network/control";
	import Toggle from "@dusk-network/toggle";
	import Card from "@dusk-network/card";
	import Group from "@dusk-network/group";
	import { getCookie, setCookie } from "$lib/helpers/cookie-utils.js";
	import { isSettingsVisible, isCookieBannerVisible } from "$lib/store.js";
	import config from "../../config/index.js";

	export let showSettings = false;

	let fields = config.cookieFields;

	onMount(() => {
		const cookie = getCookie(config.gdprCookieName);

		if (cookie !== undefined) {
			const savedFields = JSON.parse(cookie);
			fields = savedFields;
		}
	});
</script>

<svelte:window
	on:keydown="{(event) => {
		if (event.key === 'Escape') {
			if ($isSettingsVisible) {
				isSettingsVisible.update(() => false);
			}
		}
	}}"
/>

{#if showSettings}
	<div class="duk-docs-settings">
		<Card>
			<Heading>
				<h2><strong>Settings</strong></h2>
				<svelte:fragment slot="button">
					<Button
						size="sm"
						circle="{true}"
						variant="brand"
						outline="{true}"
						on:click="{() => isSettingsVisible.update(() => false)}"
						label="close settings"
					>
						Close
					</Button>
				</svelte:fragment>
			</Heading>
			<Content>
				<RichText><strong>Cookies</strong></RichText>
				<Control
					name="essential"
					type="inline-fixed"
					width="full"
					label="Essential cookies"
					message="Used for privacy settings. Can't be turned off."
				>
					<Toggle
						name="essential"
						bind:value="{fields.essential}"
						checked="{true}"
						disabled="{true}"
					/>
				</Control>
				<Control
					name="tracking"
					type="inline-fixed"
					width="full"
					label="Tracking cookies"
					message="Used for advertising purposes."
				>
					<Toggle
						name="tracking"
						bind:value="{fields.tracking}"
						checked="{fields.tracking}"
						on:change="{() => {
							fields.tracking = !fields.tracking;
						}}"
					/>
				</Control>
				<Control
					name="analytics"
					type="inline-fixed"
					width="full"
					label="Analytics cookies"
					message="Used to enable Google Analytics."
				>
					<Toggle
						name="analytics"
						bind:value="{fields.analytics}"
						checked="{fields.analytics}"
						on:change="{() => {
							fields.analytics = !fields.analytics;
						}}"
					/>
				</Control>
				<Control
					name="marketing"
					type="inline-fixed"
					width="full"
					label="Marketing cookies"
					message="Used for marketing data."
				>
					<Toggle
						name="marketing"
						bind:value="{fields.marketing}"
						checked="{fields.marketing}"
						on:change="{() => {
							fields.marketing = !fields.marketing;
						}}"
					/>
				</Control>
				<Group align="center">
					<Button
						label="save settings"
						variant="cta"
						on:click="{() => {
							setCookie(config.gdprCookieName, fields, config.cookieConfig);
							isSettingsVisible.update(() => false);
							isCookieBannerVisible.update(() => false);
						}}"
					>
						Save
					</Button>
				</Group>
			</Content>
		</Card>
	</div>
{/if}
