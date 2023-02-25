import fs from "fs";
import { render } from "@testing-library/svelte";
import Statistic from "./Statistic.svelte";

const title = "Test title";
test("Statistic Component renders with correct styles and title", () => {
	const results = render(Statistic, {
		props: {
			title: title,
		},
	});
	expect(() => results.toHaveClass("duk-statistic"));
	expect(results.container.querySelector(".duk-statistic__title").innerHTML).toBe(title);
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/molecules-statistic-snap.png")).toMatchImageSnapshot();
});
