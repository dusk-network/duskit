import fs from "fs";
import { render } from "@testing-library/svelte";
import Balance from "./Balance.svelte";

test("Balance Component renders correctly", () => {
	const results = render(Balance, {});
	expect(() => results.toHaveClass("duk-balance"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/atoms-balance-snap.png")).toMatchImageSnapshot();
});
