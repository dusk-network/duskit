<script>
	/**
	 * Sets the size of the Heading.
	 * @type {"x-small" | "small" | "medium" | "large" | "x-large" }
	 */
	export let size = "medium";
	import "./styles.css";
</script>

<span
	class="text"
	class:text--x-small="{size === 'x-small'}"
	class:text--small="{size === 'small'}"
	class:text--medium="{size === 'medium'}"
	class:text--large="{size === 'large'}"
	class:text--x-large="{size === 'x-large'}"
>
	<slot />
</span>
