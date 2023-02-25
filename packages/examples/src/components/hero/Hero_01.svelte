<script>
	import Hero from "@dusk-network/hero";
	import Button from "@dusk-network/button";
	import RichText from "@dusk-network/rich-text";

	const introduction =
		"<h1>Heros are very reusable!</h1> <p>The Dusk Grants Program helps projects and developers launch to drive mainstream adoption of blockchain and build the future of finance. Opportunities on Dusk Network are endless.</p>";
	const description =
		"<p>Enable any size enterprise to collaborate at scale, meet the highest level of compliance requirements, and ensure that personal and transaction data remains confidential.</p>";
	const image = '<img src="https://content.dusk.network/uploads/Group_10_1_b752fec2fa.svg" />';
</script>

<Hero>
	<div slot="introduction">
		<RichText>
			{@html introduction}
		</RichText>
	</div>
	<div slot="cta">
		<Button href="https://google.com">
			Apply
			<svelte:fragment slot="labelRight">Join the Dusk Mission</svelte:fragment>
		</Button>
		<RichText>
			{@html description}
		</RichText>
	</div>
	<div slot="image">
		<RichText>{@html image}</RichText>
	</div>
</Hero>
