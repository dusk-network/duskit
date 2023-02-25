import fs from "fs";
import { render } from "@testing-library/svelte";
import CtaList from "./CtaList.svelte";
import variants from "@dusk-network/utilities/variants.js";
import types from "@dusk-network/utilities/types.js";

test("Ordered CtaList component renders correctly", () => {
	const results = render(CtaList, {
		props: {
			variant: variants.CTA_LIST.BRAND,
			type: types.CTA_LIST.ORDERED,
		},
	});
	expect(() => results.toHaveClass("duk-cta-list"));
	expect(() => results.toHaveClass("duk-cta-list--brand"));
	expect(() => results.toHaveClass("duk-cta-list--ordered"));
});

test("Ordered CtaList component renders correctly", () => {
	const results = render(CtaList, {
		props: {
			variant: variants.CTA_LIST.CTA,
			type: types.CTA_LIST.UNORDERED,
		},
	});
	expect(() => results.toHaveClass("duk-cta-list"));
	expect(() => results.toHaveClass("duk-cta-list--cta"));
	expect(() => results.toHaveClass("duk-cta-list--unordered"));
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/molecules-cta-list-snap.png")).toMatchImageSnapshot();
});
