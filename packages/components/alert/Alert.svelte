<script>
	import { setContext } from "svelte";
	import variants from "@dusk-network/utilities/variants.js";
	import contexts from "@dusk-network/utilities/contexts.js";
	import "./styles.css";

	/**
	 * Used to display the Alert when true.
	 */
	export let value = false;

	/**
	 * Sets the `id` of the Alert if set, otherwise the ID is generated.
	 * @type {string}
	 */
	export let id = "__DUK-alert-" + Math.random().toString(36);

	/**
	 * Sets the Alert to be dismissable when true.
	 */
	export let dismissable = false;

	/**
	 * Sets the variant of the Alert.
	 * @type { "success" | "warning" | "danger" }
	 */
	export let variant = variants.ALERT.INFO;

	/**
	 * Sets the Alert as a modal.
	 */
	export let modal = false;

	setContext("DUK:icon:context", contexts.ICON.ALERT);
</script>

{#if value}
	<div
		id="{id}"
		class="{$$props.class || ''} duk-alert"
		class:duk-alert--success="{variant === variants.ALERT.SUCCESS}"
		class:duk-alert--warning="{variant === variants.ALERT.WARNING}"
		class:duk-alert--danger="{variant === variants.ALERT.DANGER}"
		class:duk-alert--modal="{modal}"
		role="alertdialog"
		aria-labelledby="{id}-title"
		aria-describedby="{id}-content"
		on:click
		on:mouseover
		on:focus
		on:keypress
	>
		<div class="duk-alert__indicator">
			<slot name="icon" />
		</div>
		<div class="duk-alert__body">
			<h4 id="{id}-title">
				<slot name="title" />
			</h4>
			<div id="{id}-content" class="duk-alert__content">
				<slot />
			</div>
			<div class="duk-alert__actions">
				{#if dismissable}
					<button
						id="{id}-dismiss"
						aria-controls="{id}"
						aria-label="Dismiss alert"
						on:click="{() => (value = false)}"
						class="duk-alert__dismiss"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
							></path></svg
						>
					</button>
				{/if}
				<slot name="actions" />
			</div>
		</div>
	</div>
{/if}
