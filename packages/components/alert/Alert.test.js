import fs from "fs";
import { render, fireEvent } from "@testing-library/svelte";
import Alert from "./Alert.svelte";
import variants from "@dusk-network/utilities/variants.js";

test("Alert Component renders correctly", async () => {
	const results = render(Alert, {
		props: {
			value: true,
			dismissable: true,
			variant: variants.ALERT.DANGER,
			modal: true,
		},
	});
	expect(() => results.toHaveClass("duk-alert"));
	expect(() => results.toHaveClass("duk-alert--danger"));
	expect(() => results.toHaveClass("duk-alert--modal"));
	expect(() => results.toHaveClass("duk-alert__dismiss"));

	//Check if Alert is dismissable
	await fireEvent.click(results.container.querySelector(".duk-alert__dismiss"));
	expect(() => results.toHaveClass("duk-alert")).toThrowError();
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/molecules-alert-snap.png")).toMatchImageSnapshot();
});
