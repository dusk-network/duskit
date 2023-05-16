<script>
	export let message;
	export let submitted;
	export let fields;
	export let schema;
	export let name;
	export let id;
</script>

<div class="duk-control__message" id="{id}-message">
	{#if $submitted && name}
		{#await $schema.validateAt(name, $fields) then result}
			<p></p>
		{:catch error}
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
				><path fill="currentColor" d="M12 2L1 21h22M12 6l7.53 13H4.47M11 10v4h2v-4m-2 6v2h2v-2"
				></path></svg
			>
			<p>{error.errors[0]}</p>
		{/await}
	{:else if message}
		<p>{message}</p>
	{/if}
</div>
