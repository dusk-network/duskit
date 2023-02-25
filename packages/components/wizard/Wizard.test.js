import fs from "fs";
import { render, fireEvent } from "@testing-library/svelte";
import Wizard from "./Wizard.svelte";

test("Wizard Component renders with correct number of steps", async () => {
	const stepCount = 4;
	const results = render(Wizard, {
		props: {
			stepCount: stepCount,
		},
	});
	expect(() => results.toHaveClass("duk-wizard"));
	expect(results.container.querySelectorAll(".duk-breadcrumb__item")[1].innerHTML).toBe(
		`Step 1 of ${stepCount}`,
	);

	let mockEvent = vi.fn();
	results.component.$on("exit", function (event) {
		mockEvent(event);
		expect(event.type).toBe("exit");
	});

	await fireEvent.click(results.container.querySelector(".duk-icon"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/organisms-wizard-snap.png")).toMatchImageSnapshot();
});
