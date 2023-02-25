import fs from "fs";
import { render, fireEvent, getByText } from "@testing-library/svelte";
import DropDown from "./DropDown.svelte";

test("DropDown Component renders correctly", () => {
	const results = render(DropDown, {
		props: {
			options: ["option 1", "option 2", "option 3", "option 4", "option 5"],
		},
	});
	expect(() => results.toHaveClass("duk-drop-down"));
});

test("DropDown list renders on user click and select event is dispatched correctly", async () => {
	const results = render(DropDown, {
		props: {
			options: ["option 1", "option 2", "option 3", "option 4", "option 5"],
		},
	});
	await fireEvent.click(results.getByText("option 1"));
	expect(() => {
		results.getByText("option 2").not.toThrow();
	});
	let mockEvent = vi.fn();
	results.component.$on("select", function (event) {
		mockEvent(event.detail);
	});
	await fireEvent.click(results.getByText("option 2"));

	expect(mockEvent).toHaveBeenCalled();
	expect(mockEvent).toHaveBeenCalledTimes(1);
	expect(mockEvent).toHaveBeenLastCalledWith("option 2");

	expect(() => {
		results.getByText("option 2").not.toThrow();
	});
});

test("Visual regression test", () => {
	expect(fs.readFileSync("./tests/snapshots/atoms-drop-down-snap.png")).toMatchImageSnapshot();
});
