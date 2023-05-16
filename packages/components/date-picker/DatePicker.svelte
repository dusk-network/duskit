<script>
	import "./styles.css";
	import DropDown from "@dusk-network/drop-down";
	import { getMonthLength, getCalendarDays, getDefaultLocalization } from "./date-picker";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	/**
	 * Month names and weekday order being displayed
	 */
	const dateLocale = getDefaultLocalization();

	/**
	 * Predefined Date value, `null` if no date is selected. Only `Date` object is accepted
	 */
	export let value = null;

	/**
	 * The earliest year the user can select
	 */
	export let min = new Date(1990, 0, 1);

	/**
	 * The latest year the user can select
	 */
	export let max = new Date();

	function cloneDate(d) {
		return new Date(d.getTime());
	}

	function setValue(d) {
		if (d.getTime() !== value?.getTime()) {
			browseDate = checkDateinRange(d, min, max);
			value = cloneDate(browseDate);
		}
	}

	function browse(d) {
		browseDate = checkDateinRange(d, min, max);
		if (value) {
			setValue(browseDate);
		}
	}

	/**
	 * Check if selected date is within min/max range and assign min or max date if selected date is lower or higher
	 */
	function checkDateinRange(d, min, max) {
		if (d > max) {
			return cloneDate(max);
		} else if (d < min) {
			return cloneDate(min);
		} else {
			return cloneDate(d);
		}
	}

	/**
	 * The Month and Year shown in the picker when none is selected
	 */
	let browseDate = value ? cloneDate(value) : cloneDate(new Date());

	/**
	 * Check if `value` is within min/max range and assign min or max date if `value` is lower or higher
	 */
	$: if (value && value > max) {
		setValue(max);
	} else if (value && value < min) {
		setValue(min);
	}

	let years = getPickerYears(min, max);
	$: years = getPickerYears(min, max);
	function getPickerYears(min, max) {
		let years = [];
		for (let i = min.getFullYear(); i <= max.getFullYear(); i++) {
			years.push(i);
		}
		return years;
	}

	$: browseYear = browseDate.getFullYear();
	function setYear(newYear) {
		browseDate.setFullYear(newYear);
		browseDate = browseDate;
		browse(browseDate);
	}

	$: browseMonth = browseDate.getMonth();
	function setMonth(newMonth) {
		let newYear = browseDate.getFullYear();
		if (newMonth === 12) {
			newMonth = 0;
			newYear++;
		} else if (newMonth === -1) {
			newMonth = 11;
			newYear--;
		}

		const maxDate = getMonthLength(newYear, newMonth);
		const newDate = Math.min(browseDate.getDate(), maxDate);
		browse(
			new Date(
				newYear,
				newMonth,
				newDate,
				browseDate.getHours(),
				browseDate.getMinutes(),
				browseDate.getSeconds(),
				browseDate.getMilliseconds(),
			),
		);
	}

	$: calendarDays = getCalendarDays(browseDate, dateLocale.weekStartsOnDay);

	function selectDay(calendarDay) {
		if (dayIsInRange(calendarDay, min, max)) {
			browseDate.setFullYear(0);
			browseDate.setMonth(0);
			browseDate.setDate(1);
			browseDate.setFullYear(calendarDay.year);
			browseDate.setMonth(calendarDay.month);
			browseDate.setDate(calendarDay.number);
			setValue(browseDate);
			dispatch("date", browseDate);
		}
	}
	function dayIsInRange(calendarDay, min, max) {
		const date = new Date(calendarDay.year, calendarDay.month, calendarDay.number);
		const minDate = new Date(min.getFullYear(), min.getMonth(), min.getDate());
		const maxDate = new Date(max.getFullYear(), max.getMonth(), max.getDate());
		return date >= minDate && date <= maxDate;
	}
</script>

<div class="{$$props.class || ''} duk-date-picker">
	<div class="duk-date-picker__navigation">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M22 12a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2a10 10 0 0 1 10 10m-6.6 4.6L10.8 12l4.6-4.6L14 6l-6 6l6 6l1.4-1.4Z"
			></path></svg
		>
		<DropDown
			class="duk-date-picker__months"
			options="{dateLocale.months}"
			selectedIndex="{browseMonth}"
			on:select="{(e) => setMonth(parseInt(dateLocale.months.indexOf(e.detail)))}"
		/>
		<DropDown
			class="duk-date-picker__years"
			options="{years}"
			selectedIndex="{years.indexOf(browseYear)}"
			on:select="{(e) => setYear(parseInt(e.detail))}"
		/>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M22 12a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2a10 10 0 0 1 10 10m-12 6l6-6l-6-6l-1.4 1.4l4.6 4.6l-4.6 4.6L10 18Z"
			></path></svg
		>
	</div>
	<div class="duk-date-picker__weekdays">
		{#each Array(7) as _, i}
			{#if i + dateLocale.weekStartsOnDay < 7}
				<div class="duk-date-picker__weekday">
					{dateLocale.weekdays[dateLocale.weekStartsOnDay + i]}
				</div>
			{:else}
				<div class="duk-date-picker__weekday">
					{dateLocale.weekdays[dateLocale.weekStartsOnDay + i - 7]}
				</div>
			{/if}
		{/each}
	</div>
	{#each Array(6) as _, weekIndex}
		<div class="duk-date-picker__week">
			{#each calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7) as calendarDay}
				<div
					class="duk-date-picker__date"
					on:click="{selectDay(calendarDay)}"
					on:keypress="{selectDay(calendarDay)}"
					class:duk-date-picker__date--disabled="{!dayIsInRange(calendarDay, min, max)}"
					class:duk-date-picker__date--selected="{calendarDay.year === value?.getFullYear() &&
						calendarDay.month === value?.getMonth() &&
						calendarDay.number === value.getDate()}"
					class:duk-date-picker__date--other="{calendarDay.month !== browseMonth}"
				>
					<span>{calendarDay.number}</span>
				</div>
			{/each}
		</div>
	{/each}
</div>
