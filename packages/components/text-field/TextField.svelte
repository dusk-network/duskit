<script>
	import { getContext } from "svelte";
	import states from "@dusk-network/utilities/states.js";
	import contexts from "@dusk-network/utilities/contexts.js";
	import "./styles.css";

	/**
	 * Sets value to prepopulate the Text Field.
	 * @type {string}
	 */
	export let value = "";

	/**
	 * Sets the Text Field to be disabled when true.
	 */
	export let disabled = false;

	/**
	 * Sets the Text Field to be a textarea when true.
	 */
	export let multiline = false;

	/**
	 * Sets the Text Field placeholder.
	 */
	export let placeholder = "";

	/**
	 * Sets the state of the Text Field
	 * @type { "success" | "attention" | "warning" }
	 */
	export let state = states.TEXT_FIELD.DEFAULT;

	/**
	 * Sets the `id` of the Text Field if set, otherwise the ID is generated.
	 */
	export let id = "__DUK-text-field" + Math.random().toString(36);

	/**
	 * Sets the Text Field name.
	 * @type {string}
	 */
	export let name = "";

	/**
	 * Sets the Text Field as focused when true.
	 */
	export let focused = false;

	/**
	 * Sets the theme of the TextField.
	 * @type {'light'|'dark'}
	 */
	export let theme;

	let context = getContext("DUK:text-field:context") || "";

	function toggleFocused() {
		focused = !focused;
	}
</script>

{#if multiline}
	<textarea
		bind:value="{value}"
		class="{$$props.class || ''} duk-text-field"
		class:duk-text-field--warning="{state === states.TEXT_FIELD.WARNING}"
		class:duk-text-field--success="{state === states.TEXT_FIELD.SUCCESS}"
		class:duk-text-field--attention="{state === states.TEXT_FIELD.ATTENTION}"
		class:duk-control__input--text-field="{context === contexts.TEXT_FIELD.CONTROL}"
		class:duk-control__input="{context === contexts.TEXT_FIELD.CONTROL}"
		class:duk-text-field--dark="{theme === 'dark'}"
		disabled="{disabled}"
		aria-describedby="{id}-label"
		aria-invalid="{state === states.TEXT_FIELD.WARNING ? 'true' : 'false'}"
		id="{id}"
		name="{name}"
		on:blur
		on:blur="{toggleFocused}"
		on:change
		on:click
		on:focus
		on:focus="{toggleFocused}"
		on:input
		on:keydown
		on:keypress
		on:keyup
		on:paste
		placeholder="{placeholder || undefined}"></textarea>
{:else}
	<input
		bind:value="{value}"
		class="{$$props.class || ''} duk-text-field"
		class:duk-text-field--warning="{state === states.TEXT_FIELD.WARNING}"
		class:duk-text-field--success="{state === states.TEXT_FIELD.SUCCESS}"
		class:duk-text-field--attention="{state === states.TEXT_FIELD.ATTENTION}"
		class:duk-control__input--text-field="{context === contexts.TEXT_FIELD.CONTROL}"
		class:duk-control__input="{context === contexts.TEXT_FIELD.CONTROL}"
		class:duk-text-field--dark="{theme === 'dark'}"
		disabled="{disabled}"
		aria-describedby="{id}-message"
		aria-invalid="{state === states.TEXT_FIELD.WARNING ? 'true' : 'false'}"
		id="{id}"
		name="{name}"
		on:blur
		on:blur="{toggleFocused}"
		on:change
		on:click
		on:focus
		on:focus="{toggleFocused}"
		on:input
		on:keydown
		on:keypress
		on:keyup
		on:paste
		placeholder="{placeholder || undefined}"
		{...$$restProps}
	/>
{/if}
