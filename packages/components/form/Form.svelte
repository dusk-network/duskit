<script>
	import "./styles.css";
	import { getContext, setContext } from "svelte";
	import { writable } from "svelte/store";
	import contexts from "@dusk-network/utilities/contexts.js";

	/**
	 * Sets the function used for handling the submit event
	 * @type {function}
	 */
	export let submitHandler;

	/**
	 * Sets the schema used for validating the Form fields.
	 */
	export let schema;

	/**
	 * Sets the object that holds all the input data from the Form fields.
	 */
	export let fields;

	/**
	 * Used to keep track of Form submission.
	 */
	export let submitted;

	const context = getContext("DUK:form:context");

	let formSchema = writable(schema);
	let formFields = writable(fields);
	let formSubmitted = writable(submitted);

	setContext("DUK:form:schema", formSchema);
	setContext("DUK:form:fields", formFields);
	setContext("DUK:form:submitted", formSubmitted);
	setContext("DUK:file-upload:context", contexts.FILE_UPLOAD.FORM);
	setContext("DUK:group:context", contexts.GROUP.FORM);

	$: $formFields = fields;
	$: $formSchema = schema;
	$: $formSubmitted = submitted;
</script>

<form
	class="{$$props.class || ''} duk-form"
	class:duk-form--content="{context === contexts.FORM.CONTENT}"
	class:duk-form--wizard="{context === contexts.FORM.WIZARD}"
	on:submit|preventDefault="{submitHandler}"
	{...$$props}
>
	<slot />
</form>
