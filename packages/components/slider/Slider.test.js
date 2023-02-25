import fs from "fs";
import { render, fireEvent } from "@testing-library/svelte";
import Slider from "./Slider.svelte";

test("Slider Component renders with correct value and slides to correct position", async () => {
	const results = render(Slider, {
		props: {
			min: 1,
			max: 100,
			value: 20,
		},
	});
	expect(() => results.toHaveClass("duk-slider"));
	expect(results.container.querySelector(".duk-slider").getAttribute("min")).toEqual("1");
	expect(results.container.querySelector(".duk-slider").getAttribute("max")).toEqual("100");
	expect(results.container.querySelector(".duk-slider").value).toEqual("20");

	results.container.addEventListener("change", () => {
		expect(results.container.querySelector(".duk-slider").value).toEqual("30");
	});

	await fireEvent.change(results.container.querySelector(".duk-slider"), {
		target: { value: 30 },
	});
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/atoms-slider-snap.png")).toMatchImageSnapshot();
});
