import fs from "fs";
import { render, fireEvent } from "@testing-library/svelte";
import Mnemonic from "./Mnemonic.svelte";
import types from "@dusk-network/utilities/types.js";

const seed = [
	"oyster",
	"close",
	"apple",
	"unfold",
	"wood",
	"alone",
	"during",
	"storm",
	"pulp",
	"glow",
	"album",
	"shop",
];

test("Mnemonic Preview component renders correctly", () => {
	const results = render(Mnemonic, {
		props: {
			type: types.MNEMONIC.PREVIEW,
			seed: seed,
		},
	});
	expect(() => results.toHaveClass("duk-mnemonic"));

	//Create NodeList with all seed words
	let wordNodeList = results.container.querySelectorAll(".duk-mnemonic__word");
	let wordList = [];

	//Check if the words displayed are the ones from the seed and in the same order
	for (let i = 0; i < wordNodeList.length; i++) {
		let item = wordNodeList[i].innerHTML;
		expect(item).toEqual(seed[i]);
		wordList.push(item);
	}
	expect(seed.length).toEqual(wordList.length);
});

test("Mnemonic Confirm component renders correctly", async () => {
	const results = render(Mnemonic, {
		props: {
			type: types.MNEMONIC.CONFIRM,
			seed: seed,
		},
	});
	expect(() => results.toHaveClass("duk-mnemonic"));

	//Create a NodeList with all button seed words
	let buttonNodeList = results.container.querySelectorAll(".duk-button--brand");
	expect(seed.length).toEqual(buttonNodeList.length);

	//Click on every word button and check if buttons become disabled
	for (let i = 0; i < buttonNodeList.length; i++) {
		await fireEvent.click(buttonNodeList[i]);
		expect(buttonNodeList[i].hasAttribute("disabled")).toBe(true);
	}

	//Create a NodeList with all selected words
	let wordNodeList = results.container.querySelectorAll(".duk-mnemonic__word");

	//Check to see if there is an equal number buttons and seed words
	expect(buttonNodeList.length).toEqual(wordNodeList.length);

	//Check to see if the buttons and seed words are displayed in the correct order
	for (let i = 0; i < buttonNodeList.length; i++) {
		expect(buttonNodeList[i].innerHTML.trim()).toBe(wordNodeList[i].innerHTML);
	}

	// Trigger reset button
	let resetButton = results.container.querySelector(".duk-mnemonic__buttons .duk-button--danger");
	await fireEvent.click(resetButton);

	//Reassign the button and seed word NodeLists
	buttonNodeList = results.container.querySelectorAll(".duk-button--brand");
	wordNodeList = results.container.querySelectorAll(".duk-mnemonic__word");

	//Check to see if seed word buttons have become clickable after reset
	for (let i = 0; i < buttonNodeList.length; i++) {
		expect(buttonNodeList[i].hasAttribute("disabled")).toBe(false);
	}

	//Check if selected words have been removed from the Mnemonic
	for (let i = 0; i < wordNodeList.length; i++) {
		expect(wordNodeList[i].innerHTML.trim()).toEqual("");
	}
});

test("Mnemonic Authenticate component renders correctly", async () => {
	const results = render(Mnemonic, {
		props: {
			type: types.MNEMONIC.AUTHENTICATE,
		},
	});
	expect(() => results.toHaveClass("duk-mnemonic"));

	let inputNodeList = results.container.querySelectorAll(".duk-text-field--mnemonic");

	//Check if input works
	await fireEvent.input(inputNodeList[0], {
		target: { value: "seed word test" },
	});

	//Check input value
	expect(inputNodeList[0].value).toBe("seed word test");
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/molecules-mnemonic-snap.png")).toMatchImageSnapshot();
});
