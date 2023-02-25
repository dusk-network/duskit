import fs from "fs";
import { render } from "@testing-library/svelte";
import Navbar from "./Navbar.svelte";

const apps = [
	{
		url: "https://dusk-explorer-staging-x8fib.dusk.network",
		title: "Explorer",
	},
	{
		url: "https://dusk-wallet-staging-a59m3.dusk.network",
		title: "Wallet",
	},
	{
		url: "https://dusk-staking-staging-b6jaq.dusk.network",
		title: "Staking",
	},
	{
		url: "https://dusk-learn-staging-ck9ua.dusk.network",
		title: "Learn",
	},
	{
		url: "https://dusk-grants-staging-n9gwi.dusk.network",
		title: "Grants",
	},
	{
		url: "https://dusk-labs-staging-qbhj7.dusk.network",
		title: "Labs",
	},
];

const links = [];
const networks = ["Testnet", "Devnet"];

test("Navbar component renders correctly", () => {
	const results = render(Navbar, {
		props: {
			apps: apps,
			links: links,
			networks: networks,
			title: "Test Navbar",
			selectedNetwork: networks[0],
		},
	});
	expect(() => results.toHaveClass("duk-navbar"));
	//Check if title is set correctly
	expect(results.container.querySelector(".duk-navbar__heading").innerHTML).toBe("Test Navbar");

	//Check if the selected network is set correctly
	expect(results.container.querySelector(".duk-drop-down__selected-label").innerHTML).toBe(
		networks[0],
	);

	//Create app links NodeList
	let appLinksNodeList = results.container.querySelectorAll("a.duk-menu__item-wrapper");

	//Check if the correct number of app links has been rendered
	expect(appLinksNodeList.length).toEqual(apps.length);

	//Check if app links have been rendered in the correct order
	for (let i = 0; i < apps.length; i++) {
		expect(appLinksNodeList[i].innerHTML.trim()).toBe(apps[i].title);
	}
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/organisms-navbar-snap.png")).toMatchImageSnapshot();
});
