import fs from "fs";
import { render } from "@testing-library/svelte";
import Gauge from "./Gauge.svelte";

test("Gauge component renders correctly", () => {
	const results = render(Gauge, {
		props: {
			maxValue: 100,
			minValue: 0,
			value: 20,
		},
	});
	expect(() => results.toHaveClass("duk-gauge"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/atoms-gauge-snap.png")).toMatchImageSnapshot();
});
