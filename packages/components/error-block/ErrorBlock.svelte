<script>
	import NotFound from "./Error404.svelte";
	import Error from "./ErrorBug.svelte";
	import "./styles.css";

	/**
	 * The response HTTP code for the Error Block
	 * @type {number}
	 */
	export let code = null;

	/**
	 * Sets the message for the Error Block
	 */
	export let message = null;

	/**
	 * Sets the stack trace of the Error Block
	 */
	export let stack = null;

	/**
	 * Shows the Error object stack based on application mode
	 */
	export let dev = null;
</script>

<div class="{$$props.class || ''} duk-error-block">
	{#if code == 404}
		<h1 class="duk-error-block__text duk-error-block__text--warning">
			Looks like we couldn't find what you were looking for!
		</h1>
		<div class="duk-error-block__image">
			<NotFound />
		</div>
	{:else}
		<h1 class="duk-error-block__text duk-error-block__text--danger">
			Looks like something went wrong!
		</h1>
		<div class="duk-error-block__image">
			<Error />
		</div>
	{/if}

	{#if dev && stack}
		<h2
			class="duk-error-block__stack-text {code == 404
				? 'duk-error-block__stack-text--warning'
				: 'duk-error-block__stack-text--danger'}"
		>
			Error and Stacktrace
		</h2>
		<p class="duk-error-block__message">{message}</p>
		<code
			class="duk-error-block__stack {code == 404
				? 'duk-error-block__stack--warning'
				: 'duk-error-block__stack--danger'}"
			>{stack}
		</code>
	{/if}
</div>
