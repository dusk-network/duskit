<script>
	import { number } from "svelte-i18n"; // eslint-disable-line
	import "./styles.css";
	import { arc } from "d3-shape";
	import { scaleLinear } from "d3-scale";
	import { tweened } from "svelte/motion";

	/**
	 * Sets the max value of the gauge.
	 * @type {number}
	 */
	export let maxValue;

	/**
	 * Sets the min value of the gauge.
	 * @type {number}
	 */
	export let minValue;

	/**
	 * Sets the value of the gauge.
	 * @type {number}
	 */
	export let value;

	/**
	 * Sets the width of the gauge. Default is auto. Any unit is permitted.
	 * If width is left on default the gauge will use all the available container space to display.
	 */
	export let width = "auto";

	/**
	 * Sets the Gauge to have a tooltip when true.
	 */
	export let tooltip = false;

	let state = {
		low: "#88B178",
		medium: "#DFC543",
		high: "#D82E60",
	};

	let indicator = tweened(-1.44);
	let fillColor, tooltipWidth;

	$: scale = scaleLinear()
		.domain([minValue || 0, maxValue])
		.range([0, 1]);

	$: percentage = scale(value);

	$: angleScale = scaleLinear()
		.domain([0, 1])
		.range([-Math.PI / 2, Math.PI / 2])
		.clamp(true);

	$: angle = angleScale(percentage);
	$: correctedAngle = correctAngle(angle);

	$: percentage, (fillColor = getState(percentage));

	let backgroundArc = arc()
		.innerRadius(0.7)
		.outerRadius(0.95)
		.startAngle(-Math.PI / 2 + 0.1)
		.endAngle(Math.PI / 2 - 0.1)
		.cornerRadius(1);
	$: filledArc = arc()
		.innerRadius(0.72)
		.outerRadius(0.93)
		.startAngle(-Math.PI / 2 + 0.13)
		.endAngle(correctedAngle)
		.cornerRadius(1);

	$: indicator.set(correctedAngle);

	const getState = () => {
		switch (true) {
			case percentage <= 0.25:
				return state.low;
			case percentage <= 0.75 && percentage >= 0.25:
				return state.medium;
			case percentage <= 1 && percentage >= 0.75:
				return state.high;
		}
	};

	const correctAngle = (angle) => {
		switch (true) {
			case angle < 0:
				return angle + 0.13;
			case angle > 0:
				return angle - 0.13;
			case angle === 0:
				return angle;
		}
	};
</script>

<div class="{$$props.class || ''} duk-gauge" style="{`width:${width}`}">
	<svg viewBox="-1 -0.98 2 1">
		<path d="{backgroundArc()}" fill="transparent" stroke-width="0.045px" stroke="#343434"></path>
		<path style="{value === 0 ? 'visibility:hidden' : ''}" d="{filledArc()}" fill="{fillColor}"
		></path>
	</svg>
	<svg
		style="{`transform: translateX(-50%) rotate(${$indicator}rad);`}"
		class="duk-gauge__dial"
		width="6"
		height="16"
		viewBox="0 0 6 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M0.566927 11.9426C0.566927 13.5173 1.70462 14.7018 3.00026 14.7018C4.2959 14.7018 5.43359 13.5173 5.43359 11.9426C5.43359 11.5632 5.26783 10.687 4.98888 9.51669C4.71605 8.37193 4.35133 7.00927 3.98534 5.69829C3.62889 4.42144 3.27229 3.19741 3.00026 2.27767C2.72823 3.19741 2.37163 4.42144 2.01518 5.69829C1.64919 7.00927 1.28448 8.37193 1.01164 9.51669C0.732695 10.687 0.566926 11.5632 0.566927 11.9426Z"
			fill="{fillColor}"
			stroke="#343434"></path>
	</svg>
	{#if tooltip}
		<div
			bind:clientWidth="{tooltipWidth}"
			class="duk-gauge__tooltip"
			style="width:{tooltipWidth}px"
		>
			<p>Used: {value}</p>
			<p>Limit: {maxValue}</p>
		</div>
	{/if}
</div>
