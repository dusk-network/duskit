import fs from "fs";
import { render, fireEvent } from "@testing-library/svelte";
import DatePicker from "./DatePicker.svelte";

let minDate = new Date(1990, 0, 1);
let maxDate = new Date();

let selectedMonth = new Intl.DateTimeFormat("en-US", { month: "long" }).format(maxDate);
let selectedYear = maxDate.getFullYear();

test(" DatePicker Component renders correctly", async () => {
	const results = render(DatePicker, {
		props: {
			min: minDate,
			max: maxDate,
		},
	});
	expect(() => results.toHaveClass("duk-date-picker"));

	let monthSelector = results.container.querySelector(".duk-date-picker__months");
	expect(monthSelector.querySelector(".duk-drop-down__selected-label").innerHTML).toBe(
		selectedMonth,
	);

	let yearSelector = results.container.querySelector(".duk-date-picker__years");
	expect(yearSelector.querySelector(".duk-drop-down__selected-label").innerHTML).toBe(
		String(selectedYear),
	);

	await fireEvent.click(results.container.querySelector(".duk-date-picker__prev"));
	let newMonth = new Date();
	newMonth.setMonth(maxDate.getMonth() - 1);
	let formattedNewMonth = new Intl.DateTimeFormat("en-US", {
		month: "long",
	}).format(newMonth);
	expect(monthSelector.querySelector(".duk-drop-down__selected-label").innerHTML).toBe(
		formattedNewMonth,
	);

	await fireEvent.click(results.container.querySelector(".duk-date-picker__next"));
	expect(monthSelector.querySelector(".duk-drop-down__selected-label").innerHTML).toBe(
		selectedMonth,
	);

	let displayedWeeks = results.container.querySelectorAll(".duk-date-picker__week");
	let lastWeekMonth = displayedWeeks[0];
	let displayedDays = lastWeekMonth.querySelectorAll(
		"div:not(.duk-date-picker__date--disabled):not(.duk-date-picker__date--other)",
	);
	let lastSelectableDayFirstWeek = displayedDays[displayedDays.length - 1];

	let selectedDate = lastSelectableDayFirstWeek.querySelector("span").innerHTML;

	let mockEvent = vi.fn();
	results.component.$on("date", function (event) {
		mockEvent(event.detail);
		expect(event.detail.getFullYear()).toBe(maxDate.getFullYear());
		expect(event.detail.getMonth()).toBe(maxDate.getMonth());
		expect(event.detail.getDate()).toBe(Number(selectedDate));
	});
	await fireEvent.click(lastSelectableDayFirstWeek);
	expect(mockEvent).toHaveBeenCalled();
	expect(mockEvent).toHaveBeenCalledTimes(1);
});

test("Visual regression test", () => {
	expect(
		fs.readFileSync("./tests/snapshots/organisms-date-picker-snap.png"),
	).toMatchImageSnapshot();
});
