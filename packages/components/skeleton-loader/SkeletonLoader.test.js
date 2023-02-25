import fs from "fs";
import { render } from "@testing-library/svelte";
import SkeletonLoader from "./SkeletonLoader.svelte";
import variants from "@dusk-network/utilities/variants.js";

let height = "200px";

test("SkeletonLoader Component renders with correct styles", () => {
	const results = render(SkeletonLoader, {
		props: {
			variant: variants.SKELETON_LOADER.BRAND,
			extraSmallScreenHeight: height,
			smallScreenHeight: height,
			mediumScreenHeight: height,
			largeScreenHeight: height,
			extraLargeScreenHeight: height,
			jumboScreenHeight: height,
			rounded: true,
		},
	});
	expect(() => results.toHaveClass("duk-skeleton-loader"));
	expect(() => results.toHaveClass("duk-skeleton-loader--rounded"));
	expect(() => results.toHaveClass("duk-skeleton-loader--loader"));
	let loader = results.container.querySelector(".duk-skeleton-loader__wrapper div");
	expect(loader.style._values["--xs-height"]).toEqual(height);
	expect(loader.style._values["--sm-height"]).toEqual(height);
	expect(loader.style._values["--md-height"]).toEqual(height);
	expect(loader.style._values["--lg-height"]).toEqual(height);
	expect(loader.style._values["--xl-height"]).toEqual(height);
	expect(loader.style._values["--jumbo-height"]).toEqual(height);
	expect(loader.style._values.width).toEqual("100%");
});

let height2 = "150px";
test("SkeletonLoader Component renders with correct styles and dimensions", () => {
	const results = render(SkeletonLoader, {
		props: {
			variant: variants.SKELETON_LOADER.BRAND,
			extraSmallScreenHeight: height2,
			smallScreenHeight: height2,
			mediumScreenHeight: height2,
			largeScreenHeight: height2,
			extraLargeScreenHeight: height2,
			jumboScreenHeight: height2,
			pulse: true,
			width: "50%",
		},
	});
	expect(() => results.toHaveClass("duk-skeleton-loader"));
	expect(() => results.toHaveClass("duk-skeleton-loader--pulse"));
	let loader = results.container.querySelector(".duk-skeleton-loader__wrapper div");
	expect(loader.style._values["--xs-height"]).toEqual(height2);
	expect(loader.style._values["--sm-height"]).toEqual(height2);
	expect(loader.style._values["--md-height"]).toEqual(height2);
	expect(loader.style._values["--lg-height"]).toEqual(height2);
	expect(loader.style._values["--xl-height"]).toEqual(height2);
	expect(loader.style._values["--jumbo-height"]).toEqual(height2);
	expect(loader.style._values.width).toEqual("50%");
});

test("Visual regression test", () => {
	expect(
		fs.readFileSync("./tests/snapshots/atoms-skeleton-loader-snap.png"),
	).toMatchImageSnapshot();
});
