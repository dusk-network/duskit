<script>
	import { getContext, setContext } from "svelte";
	import states from "@dusk-network/utilities/states.js";
	import contexts from "@dusk-network/utilities/contexts.js";
	import types from "@dusk-network/utilities/types.js";
	import widths from "@dusk-network/utilities/widths.js";
	import Message from "./Message.svelte";
	import "./styles.css";

	/**
	 * Sets the type of the Control.
	 * @type { "stacked" | "inline-fixed" | "inline-flex" }
	 */
	export let type = types.CONTROL.STACKED;

	/**
	 * Sets the state of the Control.
	 * @type { "success" | "warning" | "danger" }
	 */
	export let state = states.CONTROL.DEFAULT;

	/**
	 * Sets the `id` of the Control if set, otherwise the ID is generated.
	 * @type {string}
	 */
	export let id = "__DUK-control" + Math.random().toString(36);

	/**
	 * Sets the label of the Control if set.
	 */
	export let label = "";

	/**
	 * Sets the warning message of the Control if set.
	 */
	export let message = "";

	/**
	 * Sets the width of the Control inside current container.
	 * @type { "full" | "half" | "quarter" }
	 */
	export let width = widths.CONTROL.HALF;

	/**
	 * Set the `name` attribute on the Control when used.
	 */
	export let name = "";

	/**
	 * Set the Control as part of a group when true.
	 */
	export let group = false;

	setContext("DUK:icon:context", contexts.ICON.CONTROL);
	setContext("DUK:text-field:context", contexts.TEXT_FIELD.CONTROL);
	setContext("DUK:toggle:context", contexts.TOGGLE.CONTROL);
	setContext("DUK:drop-down:context", contexts.DROP_DOWN.CONTROL);
	setContext("DUK:date-picker:context", contexts.DATE_PICKER.CONTROL);
	setContext("DUK:password-strength:context", contexts.PASSWORD_STRENGTH.CONTROL);
	setContext("DUK:button:context", contexts.BUTTON.CONTROL);
	setContext("DUK:file-upload:context", contexts.FILE_UPLOAD.CONTROL);

	const context = getContext("DUK:control:context");
	const schema = getContext("DUK:form:schema");
	const fields = getContext("DUK:form:fields");
	const submitted = getContext("DUK:form:submitted");

	$: $fields && validate();
	$: $submitted && validate();

	const validate = async () => {
		if ($submitted && name) {
			state = states.CONTROL.SUCCESS;
			await $schema.validateAt(name, $fields).catch(() => {
				state = states.CONTROL.DANGER;
			});
		}
	};
</script>

<div
	class="{$$props.class || ''} duk-control"
	class:duk-control--search-list="{context === contexts.CONTROL.SEARCH_LIST}"
	class:duk-control--stacked="{type === types.CONTROL.STACKED}"
	class:duk-control--inline-fixed="{type === types.CONTROL.INLINE_FIXED}"
	class:duk-control--inline-flex="{type === types.CONTROL.INLINE_FLEX}"
	class:duk-control--success="{state === states.CONTROL.SUCCESS}"
	class:duk-control--warning="{state === states.CONTROL.WARNING}"
	class:duk-control--danger="{state === states.CONTROL.DANGER}"
	class:duk-control--full="{width === widths.CONTROL.FULL}"
	class:duk-control--half="{width === widths.CONTROL.HALF}"
	class:duk-control--quarter="{width === widths.CONTROL.QUARTER}"
	class:duk-control--group="{group}"
	class:duk-control--with-prefix="{$$slots.buttonPrefix}"
	class:duk-control--with-postfix="{$$slots.buttonPostfix}"
>
	<div class="duk-control__wrapper">
		{#if group && label}
			<h4 id="{id}-label" class="duk-control__label">
				{label}
			</h4>
		{:else if label}
			<label for="{id}" class="duk-control__label">
				{label}
			</label>
		{/if}
		<div class="duk-control__controls-wrapper">
			<slot name="buttonPrefix" variant="{state === 'default' ? 'brand' : state}" />
			<slot id="{id}" state="{state}" />
			<slot name="buttonPostfix" variant="{state === 'default' ? 'brand' : state}" />
		</div>
	</div>
	<Message
		id="{id}"
		message="{message}"
		schema="{schema}"
		fields="{fields}"
		submitted="{submitted}"
		name="{name}"
	/>
</div>
