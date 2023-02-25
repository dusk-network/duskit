import fs from "fs";
import { render } from "@testing-library/svelte";
import Address from "./Address.svelte";
import variants from "@dusk-network/utilities/variants.js";

test("Address Component renders with correct variant", () => {
	const results = render(Address, {
		props: { variant: variants.ADDRESS.BRAND },
	});
	expect(() => results.toHaveClass("duk-address"));
	expect(() => results.toHaveClass("duk-address--brand"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/atoms-address-snap.png")).toMatchImageSnapshot();
});
