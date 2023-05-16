<script>
	import "./styles.css";
	import { setContext } from "svelte";
	import { writable } from "svelte/store";

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

	let formSchema = writable(schema);
	let formFields = writable(fields);
	let formSubmitted = writable(submitted);

	setContext("DUK:form:schema", formSchema);
	setContext("DUK:form:fields", formFields);
	setContext("DUK:form:submitted", formSubmitted);

	$: $formFields = fields;
	$: $formSchema = schema;
	$: $formSubmitted = submitted;
</script>

<form
	class="{$$props.class || ''} duk-form"
	on:submit|preventDefault="{submitHandler}"
	{...$$props}
>
	<slot />
</form>
