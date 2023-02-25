<script>
	import { getContext } from "svelte";
	/**
	 * @type {number}
	 */
	export let number;

	const { step, next, previous } = getContext("DUK:wizard:state");
</script>

{#if $step === number}
	<div class="{$$props.class || ''} duk-wizard__step">
		<slot next="{next}" previous="{previous}" />
	</div>
{/if}
