import fs from "fs";
import { render, fireEvent } from "@testing-library/svelte";
import MessageBanner from "./MessageBanner.svelte";
import variants from "@dusk-network/utilities/variants.js";

test("Message Banner Component renders with correct properties", async () => {
	const results = render(MessageBanner, {
		props: {
			icon: "brightness-5",
			iconSize: "xxxl",
			buttonLabel: "Button label",
			variant: variants.MESSAGE_BANNER.BRAND,
			showBanner: true,
		},
	});
	expect(() => results.toHaveClass("duk-message-banner"));

	//Check if Icon is displayed
	expect(() => results.toHaveClass("duk-message-banner__icon"));

	//Check if correct Icon size is rendered
	expect(() => results.toHaveClass("duk-icon--xxxl"));

	let button = results.container.querySelector(".duk-button");
	//Check if correct button label has been rendered
	expect(button.innerHTML).toBe("Button label");

	await fireEvent.click(button);

	//Check if Message Banner has been closed after button click
	expect(results.container.querySelector(".duk-message-banner__banner")).toBe(null);
});

test("Visual regression test", () => {
	expect(
		fs.readFileSync("./tests/snapshots/organisms-message-banner-snap.png"),
	).toMatchImageSnapshot();
});
