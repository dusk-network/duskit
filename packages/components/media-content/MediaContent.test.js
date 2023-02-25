import fs from "fs";
import { render } from "@testing-library/svelte";
import MediaContent from "./MediaContent.svelte";

test("MeadiContent Component renders with correct styles", () => {
	const results = render(MediaContent, {
		props: {
			reverse: true,
			align: "center",
			valign: "top",
		},
	});
	expect(() => results.toHaveClass("duk-media-content"));
	expect(() => results.toHaveClass("duk-media-content--reverse"));
	expect(() => results.toHaveClass("duk-media-content--center"));
	expect(() => results.toHaveClass("duk-media-content--top"));
});

test("Visual regression test", () => {
	expect(
		fs.readFileSync("./tests/snapshots/molecules-media-content-snap.png"),
	).toMatchImageSnapshot();
});
