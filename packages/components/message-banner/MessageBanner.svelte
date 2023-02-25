<script>
	import variants from "@dusk-network/utilities/variants.js";
	import Button from "@dusk-network/button";
	import Group from "@dusk-network/group";
	import "./styles.css";

	/**
	 * Sets the Button text.
	 */
	export let buttonLabel;

	/**
	 * Sets the Message Banner variant.
	 * * @type {"brand" | "cta" | "info" | "success" | "warning" | "danger" }
	 */
	export let variant = variants.MESSAGE_BANNER.BRAND;

	export let showBanner = true;
</script>

<div class="duk-message-banner">
	{#if showBanner === true}
		<div
			class="{$$props.class || ''} duk-message-banner__banner"
			class:duk-message-banner__banner--brand="{variant === variants.MESSAGE_BANNER.BRAND}"
			class:duk-message-banner__banner--warning="{variant === variants.MESSAGE_BANNER.WARNING}"
			class:duk-message-banner__banner--danger="{variant === variants.MESSAGE_BANNER.DANGER}"
		>
			<div class="duk-message-banner__disclaimer">
				<slot />
			</div>
			<div class="duk-message-banner__controls">
				<Group align="center">
					<Button
						variant="{variant}"
						on:click="{() => {
							showBanner = false;
						}}"
						label="Close"
					>
						{buttonLabel}
					</Button>
				</Group>
			</div>
		</div>
	{/if}
</div>
