# Duskit - Footer

[![Storybook](https://img.shields.io/badge/Storybook-Component_Playground-%23FF4785?style=flat&logo=storybook)](https://dusk-network.github.io/duskit/?path=/story/components-atoms-footer)
[![Docs](https://img.shields.io/badge/Documentation-%235E35CF?style=flat)](https://dusk-network.github.io/duskit/docs/components/footer)

## Installation

```
npm i -D @dusk-network/footer
```

## Usage

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=../../../examples/src/footer/Footer_01.svelte) -->
<!-- The below code snippet is automatically added from ../../../examples/src/footer/Footer_01.svelte -->

```svelte
<script>
	import Footer from "@dusk-network/footer";

	const type = "minimal";

	const social = [
		{
			title: "CoinMarketCap",
			icon: "coin-market-cap",
			url: "https://coinmarketcap.com/currencies/dusk-network/",
		},
		{
			title: "YouTube",
			icon: "youtube",
			url: "https://www.youtube.com/c/DuskNetwork",
		},
		{
			title: "Twitter",
			icon: "twitter",
			url: "https://twitter.com/duskfoundation",
		},
		{
			title: "LinkedIn",
			icon: "linked-in",
			url: "https://www.linkedin.com/company/dusknetwork/",
		},
		{
			title: "Telegram",
			icon: "telegram",
			url: "https://t.me/DuskNetwork",
		},
		{
			title: "Github",
			icon: "github",
			url: "https://github.com/dusk-network",
		},
	];
</script>

<Footer type="{type}" social="{social}" />
```

<!-- MARKDOWN-AUTO-DOCS:END -->
