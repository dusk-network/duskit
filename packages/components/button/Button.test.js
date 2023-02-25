import fs from "fs";
import { render } from "@testing-library/svelte";
import Button from "./Button.svelte";
import variants from "@dusk-network/utilities/variants.js";
import sizes from "@dusk-network/utilities/sizes.js";

test("Button Component renders correctly", async () => {
	const results = render(Button, {
		props: {
			variant: variants.BUTTON.CTA,
			size: sizes.BUTTON.SMALL,
			label: "Button link",
			disabled: true,
		},
	});
	expect(() => results.toHaveClass("dusk-button"));
	expect(() => results.toHaveClass("dusk-button--small"));

	let button = results.container.querySelector(".duk-button");
	expect(button.getAttribute("aria-label")).toBe("Button link");
	expect(button.hasAttribute("disabled")).toBe(true);
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/molecules-button-snap.png")).toMatchImageSnapshot();
});
