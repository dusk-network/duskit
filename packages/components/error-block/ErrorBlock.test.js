import fs from "fs";
import { render } from "@testing-library/svelte";
import ErrorBlock from "./ErrorBlock.svelte";

test("Error Block displays 404 Not Found error message", () => {
	const results = render(ErrorBlock, {
		props: {
			code: 404,
		},
	});
	expect(() => results.toHaveClass("duk-error-block"));
	expect(() => results.toHaveClass("duk-error-block__text--warning"));
});

test("Error Block displays 500 status error message", () => {
	const results = render(ErrorBlock, {
		props: {
			code: 500,
		},
	});
	expect(() => results.toHaveClass("duk-error-block"));
	expect(() => results.toHaveClass("duk-error-block__text--danger"));
});

test("Error Block displays error message and stacktrace", () => {
	const results = render(ErrorBlock, {
		props: {
			code: 404,
			dev: true,
			stack: "Error stack",
			message: "Error message",
		},
	});
	expect(() => results.toHaveClass("duk-error-block"));
	expect(() => results.toHaveClass("duk-error-block__text--warning"));
	expect(() => results.toHaveClass("duk-error-block__stack-text"));
	expect(() => results.toHaveClass("duk-error-block__message"));
	expect(() => results.toHaveClass("duk-error-block__stack"));

	expect(results.container.querySelector(".duk-error-block__stack").innerHTML).toBe("Error stack");
	expect(results.container.querySelector(".duk-error-block__message").innerHTML).toBe(
		"Error message",
	);
});

test("Visual regression test", () => {
	expect(
		fs.readFileSync("./tests/snapshots/organisms-error-block-snap.png"),
	).toMatchImageSnapshot();
});
