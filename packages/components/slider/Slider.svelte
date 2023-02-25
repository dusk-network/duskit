<script>
	import { onMount, createEventDispatcher } from "svelte";
	import "./styles.css";

	/**
	 * Sets the bottom limit of the Slider.
	 * @type {number}
	 */
	export let min;

	/**
	 * Sets the top limit of the Slider.
	 * @type {number}
	 */
	export let max;

	/**
	 * Sets the value of the slider when rendered if set, otherwise it is set to 50.
	 * @type {number}
	 */
	export let value = 50;

	/**
	 * Sets the `id` of the Slider if set, otherwise the ID is generated.
	 * @type {string}
	 */
	export let id = "__DUK-slider" + Math.random().toString(36);
	const dispatch = createEventDispatcher();

	onMount(() => {
		let rangeInput = document.getElementById(id);
		rangeInput.oninput = function () {
			value = rangeInput.value;
		};
	});
</script>

<input
	class="{$$props.class || ''} duk-slider"
	type="range"
	min="{min}"
	max="{max}"
	value="{value}"
	id="{id}"
	on:input="{() => dispatch('slide', value)}"
/>
