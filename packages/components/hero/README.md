# Duskit - Hero

[![Storybook](https://img.shields.io/badge/Storybook-Component_Playground-%23FF4785?style=flat&logo=storybook)](https://dusk-network.github.io/duskit/?path=/story/components-atoms-hero)
[![Docs](https://img.shields.io/badge/Documentation-%235E35CF?style=flat)](https://dusk-network.github.io/duskit/docs/components/hero)

## Installation

```
npm i -D @dusk-network/hero
```

## Usage

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=../../../examples/src/hero/Hero_01.svelte) -->
<!-- The below code snippet is automatically added from ../../../examples/src/hero/Hero_01.svelte -->

```svelte
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
```

<!-- MARKDOWN-AUTO-DOCS:END -->
