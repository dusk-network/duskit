import fs from "fs";
import { render, fireEvent } from "@testing-library/svelte";
import Toggle from "./Toggle.svelte";
import types from "@dusk-network/utilities/types.js";
import variants from "@dusk-network/utilities/variants.js";

test("Switch Toggle Component renders correctly", async () => {
	const results = render(Toggle, {
		props: {
			variant: variants.TOGGLE.BRAND,
			type: types.TOGGLE.SWITCH,
			name: "Switch toggle",
			value: "toggle",
			disabled: true,
			checked: true,
			onIcon: "brightness-5",
			offIcon: "connection",
		},
	});
	//Check if correct css classes are assigned to elements
	expect(() => results.toHaveClass("duk-toggle"));
	expect(() => results.toHaveClass("duk-toggle--brand"));
	expect(() => results.toHaveClass("duk-toggle__switch"));

	//Select switch input element
	let switchToggle = results.container.querySelector(".duk-toggle__switch");

	//Check if props are assigned correctly
	expect(switchToggle.hasAttribute("disabled")).toBe(true);
	expect(switchToggle.getAttribute("name")).toBe("Switch toggle");
	expect(switchToggle.getAttribute("type")).toBe("checkbox");
	expect(switchToggle.getAttribute("role")).toBe("switch");
	expect(switchToggle.getAttribute("aria-checked")).toBe("true");

	//Toggle switch
	await fireEvent.click(switchToggle);

	//Check if switch has correct state after toggling
	expect(switchToggle.getAttribute("aria-checked")).toBe("false");
});

test("Checkbox Component renders correctly", async () => {
	const results = render(Toggle, {
		props: {
			variant: variants.TOGGLE.BRAND,
			type: types.TOGGLE.CHECKBOX,
			name: "Checkbox",
			value: "toggle",
			disabled: true,
			checked: true,
		},
	});
	//Check if correct css classes are assigned to elements
	expect(() => results.toHaveClass("duk-toggle"));
	expect(() => results.toHaveClass("duk-toggle--brand"));
	expect(() => results.toHaveClass("duk-toggle__checkbox"));

	//Select switch input element
	let checkbox = results.container.querySelector(".duk-toggle__checkbox");

	//Check if props are assigned correctly
	expect(checkbox.hasAttribute("disabled")).toBe(true);
	expect(checkbox.getAttribute("name")).toBe("Checkbox");
	expect(checkbox.getAttribute("type")).toBe("checkbox");
	expect(checkbox.getAttribute("role")).toBe("checkbox");
	expect(checkbox.getAttribute("aria-checked")).toBe("true");

	//Toggle checkbox
	await fireEvent.click(checkbox);

	//Check if switch has correct state after toggling
	expect(checkbox.getAttribute("aria-checked")).toBe("false");
});

test("Button Radio Component renders correctly", async () => {
	const results = render(Toggle, {
		props: {
			variant: variants.TOGGLE.BRAND,
			type: types.TOGGLE.BUTTON,
			name: "button_group",
			value: "button_1",
			group: "button_group",
		},
	});
	render(Toggle, {
		props: {
			variant: variants.TOGGLE.BRAND,
			type: types.TOGGLE.BUTTON,
			name: "button_group",
			value: "button_2",
			group: "button_group",
		},
	});
	//Check if correct css classes are assigned to elements
	expect(() => results.toHaveClass("duk-toggle"));
	expect(() => results.toHaveClass("duk-toggle--brand"));
	expect(() => results.toHaveClass("duk-toggle__button"));

	//Create button input element nodeList
	let buttonList = results.container.querySelectorAll(".duk-toggle__button");

	//Check if props are assigned correctly
	expect(buttonList[0].getAttribute("name")).toBe("button_group");
	expect(buttonList[0].getAttribute("type")).toBe("radio");
	expect(buttonList[0].getAttribute("role")).toBe("radio");

	//Check if all buttons are not selected
	expect(buttonList[0].getAttribute("aria-checked")).toBe("false");
	expect(buttonList[1].getAttribute("aria-checked")).toBe("false");

	//Toggle first button radio
	await fireEvent.click(buttonList[0]);

	//Check if button radio group inputs have correct state after toggling
	expect(buttonList[0].getAttribute("aria-checked")).toBe("true");
	expect(buttonList[1].getAttribute("aria-checked")).toBe("false");
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/atoms-toggle-snap.png")).toMatchImageSnapshot();
});
