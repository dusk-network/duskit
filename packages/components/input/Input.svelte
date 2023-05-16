<style lang="postcss">
	.input-field {
		--width-prop: var(--width, 100%);
		--width-3xl-prop: var(--width-3xl, var(--width-prop));

		@apply bg-jet flex h-fit w-[var(--width-prop)] max-w-[600px] flex-row items-center justify-between rounded-full p-[7px];
		@apply lg:w-[var(--width-3xl-prop)];

		input {
			@apply bg-jet text-gray h-[37px] pl-[12px];
		}

		input::-webkit-input-placeholder {
			@apply text-lg;
		}

		input::moz-placeholder {
			@apply text-lg;
		}

		input:focus {
			@apply border-none outline-none;
		}
	}
</style>

<script>
	import Button from "$lib/components/shared/button";

	export let placeholder = "placeholder";
	export let btnText = "text";
</script>

<div class="input-field">
	<input placeholder="{placeholder}" />
	<Button size="small">{btnText}</Button>
</div>
