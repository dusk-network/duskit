import fs from "fs";
import { render, fireEvent } from "@testing-library/svelte";
import Form from "./Form.svelte";

test("Form Component renders correctly and submits correct value", async () => {
	let submitted = false;
	const results = render(Form, {
		props: {
			submitHandler: () => {
				submitted = true;
			},
		},
	});
	expect(() => results.toHaveClass("duk-form"));

	let form = results.container.querySelector(".duk-form");

	form.addEventListener("submit", () => {
		expect(submitted).toBe(true);
	});
	await fireEvent.submit(form);
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/organisms-form-snap.png")).toMatchImageSnapshot();
});
