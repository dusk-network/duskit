import fs from "fs";
import { render } from "@testing-library/svelte";
import Footer from "./Footer.svelte";
import types from "@dusk-network/utilities/types.js";

const social = [
	{
		url: "https://coinmarketcap.com/currencies/dusk-network/",
		icon: "coin-market-cap",
		title: "CoinMarketCap",
	},
	{
		url: "https://www.youtube.com/c/DuskNetwork",
		icon: "youtube",
		title: "YouTube",
	},
	{
		url: "https://twitter.com/duskfoundation",
		icon: "twitter",
		title: "Twitter",
	},
	{
		url: "https://www.linkedin.com/company/dusknetwork/",
		icon: "linked-in",
		title: "LinkedIn",
	},
	{
		url: "https://t.me/DuskNetwork",
		icon: "telegram",
		title: "Telegram",
	},
	{
		url: "https://github.com/dusk-network",
		icon: "github",
		title: "Github",
	},
];

test("Minimal Footer component renders correctly", () => {
	const results = render(Footer, {
		props: {
			type: types.FOOTER.MINIMAL,
			social: social,
		},
	});
	expect(() => results.toHaveClass("duk-footer"));
	expect(() => results.toHaveClass("duk-footer__minimal"));
});

test("Maximal Footer component renders correctly", () => {
	const results = render(Footer, {
		props: {
			type: types.FOOTER.MAXIMAL,
			social: social,
		},
	});
	expect(() => results.toHaveClass("duk-footer"));
	expect(() => results.toHaveClass("duk-footer__minimal"));
	expect(() => results.toHaveClass("duk-footer__maximal"));
});

test("Minimal Footer with Social Menu component renders correctly", () => {
	const results = render(Footer, {
		props: {
			type: types.FOOTER.MINIMAL,
			social: social,
		},
	});
	expect(() => results.toHaveClass("duk-footer"));
	expect(() => results.toHaveClass("duk-footer__minimal"));
	expect(() => results.toHaveClass("duk-footer__social-media-menu"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/organisms-footer-snap.png")).toMatchImageSnapshot();
});
