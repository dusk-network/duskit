<script>
	import Footer from "@dusk-network/footer";

	const type = "maximal";

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
	const categories = [
		{
			title: "Blockchain",
			links: [
				{
					title: "Technology Explained",
					url: "https://dusk.network/pages/network",
				},
				{
					title: "Roadmap",
					url: "https://dusk.network/pages/roadmap",
				},
				{
					title: "Use Cases",
					url: "https://dusk.network/pages/roadmap",
				},
				{
					title: "Staking",
					url: "https://staking.dusk.network",
				},
			],
		},
		{
			title: "Developers",
			links: [
				{
					title: "Whitepaper",
					url: "https://dusk.network/uploads/dusk-whitepaperv2.pdf",
				},
				{
					title: "Github",
					url: "https://github.com/dusk-network",
				},
				{
					title: "Resources",
					url: "https://dusk.network/pages/resources",
				},
				{
					title: "PLONK Proving System",
					url: "https://crates.io/crates/dusk-plonk",
				},
			],
		},
		{
			title: "Media",
			links: [
				{
					title: "Blog",
					url: "https://dusk.network/pages/all-posts",
				},
				{
					title: "News Room",
					url: "https://dusknetwork.pr.co/",
				},
				{
					title: "Press Contact",
					url: "mailto:press@dusk.network",
				},
			],
		},
		{
			title: "Company",
			links: [
				{
					title: "Team",
					url: "https://dusk.network/pages/team",
				},
				{
					title: "Careers",
					url: "https://dusk.network/pages/jobs",
				},
				{
					title: "FAQ",
					url: "https://dusk.network/pages/faq",
				},
			],
		},
	];
</script>

<Footer type="{type}" social="{social}" categories="{categories}" />
