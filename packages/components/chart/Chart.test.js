import fs from "fs";
// import { render } from "@testing-library/svelte";
// import Chart from "./Chart.svelte";

// test("Component renders", () => {
//   const results = render(Chart, {});
//   expect(() => results.toHaveClass("duk-chart"));
// });

test("Temp", () => {
	expect(() => 1 === 1).toBeTruthy();
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/molecules-chart-snap.png")).toMatchImageSnapshot();
});
