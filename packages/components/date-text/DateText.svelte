<script>
	import "./styles.css";
	import { DateTime } from "luxon";

	/**
	 * The time string that needs to be formatted
	 */
	export let time = "";

	/**
	 * Show and additional timestamp after the formatted time.
	 * @type {boolean}
	 */
	export let showTimestamp = false;

	const TIMESTAMP_FORMAT = "MMM-dd-yyyy HH:mm:ss ZZ";

	//FIXME timesptamp string needs to be formated in an ISO format in the API
</script>

<time class="{$$props.class || ''} duk-date-text" datetime="{time}" title="{time}">
	{DateTime.fromSQL(time.substring(0, time.indexOf("+") - 1), {
		zone: "utc",
	}).toRelative()}
	{#if showTimestamp}
		<time
			>({DateTime.fromSQL(time.substring(0, time.indexOf("+") - 1), {
				zone: "utc",
			})
				.setZone("system")
				.toFormat(TIMESTAMP_FORMAT)})</time
		>
	{/if}
</time>
