import fs from "fs";
import { render } from "@testing-library/svelte";
import Control from "./Control.svelte";
import states from "@dusk-network/utilities/states.js";
import types from "@dusk-network/utilities/types.js";
import widths from "@dusk-network/utilities/widths.js";

test("Control Component renders correctly", () => {
	const results = render(Control, {
		props: {
			type: types.CONTROL.INLINE_FIXED,
			state: states.CONTROL.DANGER,
			width: widths.CONTROL.FULL,
			label: "Control label",
			message: "Control message",
			name: "Control name",
		},
	});
	expect(() => results.toHaveClass("duk-control"));
	expect(() => results.toHaveClass("duk-control--inline-fixed"));
	expect(() => results.toHaveClass("duk-control--danger"));
	expect(() => results.toHaveClass("duk-control--full"));

	expect(results.container.querySelector(".duk-control__label").innerHTML).toBe("Control label");
	expect(results.container.querySelector(".duk-control__message").innerHTML).toBe(
		"<p>Control message</p>",
	);
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/molecules-control-snap.png")).toMatchImageSnapshot();
});
