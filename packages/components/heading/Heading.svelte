<script>
	import "./styles.css";

	/**
	 * Sets the level of the heading tag. `<h1 /> to <h5 />` are supported. Anything outside the range 1 -5 will render a `<strong />`.
	 */
	export let level = 2;

	/**
	 * Sets the size of the Heading.
	 * @type {"x-small" | "small" | "medium" | "large" | "x-large" | "display" }
	 */
	export let size = "medium";

	const options = ["h1", "h2", "h3", "h4", "h5"];
	let selected = options[level - 1] ?? "strong";
</script>

<svelte:element
	this="{selected}"
	class="heading"
	class:heading--x-small="{size === 'x-small'}"
	class:heading--small="{size === 'small'}"
	class:heading--medium="{size === 'medium'}"
	class:heading--large="{size === 'large'}"
	class:heading--x-large="{size === 'x-large'}"
	class:heading--display="{size === 'display'}"
>
	<slot />
</svelte:element>
