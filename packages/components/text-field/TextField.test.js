import fs from "fs";
import { render } from "@testing-library/svelte";
import TextField from "./TextField.svelte";
import states from "@dusk-network/utilities/states.js";

test("TextField Component renders as Input", () => {
	const results = render(TextField, {
		props: {
			value: "test value",
			state: states.TEXT_FIELD.DANGER,
			disabled: true,
			placeholder: "Text field test",
			name: "Text field",
		},
	});
	expect(() => results.toHaveClass("duk-text-field"));
	expect(() => results.toHaveClass("duk-text-field--danger"));

	let textField = results.container.querySelector(".duk-text-field");
	expect(textField.hasAttribute("disabled")).toBe(true);
	expect(textField.getAttribute("placeholder")).toBe("Text field test");
	expect(textField.getAttribute("name")).toBe("Text field");
	expect(textField.value).toEqual("test value");
	expect(textField.tagName).toBe("INPUT");
});

test("TextField Component renders as Textarea", () => {
	const results = render(TextField, {
		props: {
			value: "test value",
			state: states.TEXT_FIELD.DANGER,
			disabled: true,
			placeholder: "Text field test",
			name: "Text field",
			multiline: true,
		},
	});
	expect(() => results.toHaveClass("duk-text-field"));
	expect(() => results.toHaveClass("duk-text-field--danger"));

	let textField = results.container.querySelector(".duk-text-field");
	expect(textField.hasAttribute("disabled")).toBe(true);
	expect(textField.getAttribute("placeholder")).toBe("Text field test");
	expect(textField.getAttribute("name")).toBe("Text field");
	expect(textField.value).toEqual("test value");
	expect(textField.tagName).toBe("TEXTAREA");
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/atoms-text-field-snap.png")).toMatchImageSnapshot();
});
