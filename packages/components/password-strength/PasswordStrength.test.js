import fs from "fs";
import { render } from "@testing-library/svelte";
import PasswordStrength from "./PasswordStrength.svelte";

test("PasswordStrength component renders with correct styles and output", () => {
	const results = render(PasswordStrength, {
		props: {
			password: "TestPassword2022!",
		},
	});
	expect(() => results.toHaveClass("duk-password-strength"));
	expect(() => results.toHaveClass("duk-progress-bar--success"));
	expect(results.container.querySelector(".duk-password-strength__label span").innerHTML).toBe(
		"Strong",
	);
});

test("Visual regression test", () => {
	expect(
		fs.readFileSync("./tests/snapshots/molecules-password-strength-snap.png"),
	).toMatchImageSnapshot();
});
