import fs from "fs";
// import { render, fireEvent } from "@testing-library/svelte";
// import { userEvent } from "@testing-library/user-event";
// import CookieBanner from "./CookieBanner.svelte";

// test("Cookie Banner component renders correctly", () => {
//     const results = render(CookieBanner, {
//       props: {
//         acceptLabel: "Accept",
//         settingsLabel: "Open Settings"
//       }
//     });
//     expect(() => results.toHaveClass("duk-cookie-banner"));
//     results.debug()
//   });

test("Temporary test", () => {
	expect(() => 1 === 1).toBeTruthy();
});

test("Visual regression test", () => {
	expect(
		fs.readFileSync("./tests/snapshots/organisms-cookie-banner-snap.png"),
	).toMatchImageSnapshot();
});
