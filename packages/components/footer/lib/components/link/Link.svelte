<script>
	import Heading from "@dusk-network/heading";
	import Button from "@dusk-network/button";
	import "./styles.css";

	export let content;
</script>

{#if content}
	<div class="footer-cta">
		<Heading size="display" --margin="25px" --margin-3xl="41px">
			{@html content.heading.heading}</Heading
		>
		{#if content.button}
			<Button
				size="{content.button.size}"
				variant="{content.button.variant}"
				href="{content.button.href}">{content.button.label}</Button
			>
		{/if}
	</div>
{/if}
