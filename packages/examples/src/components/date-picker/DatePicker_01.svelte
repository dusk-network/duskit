<script>
	import DatePicker from "@dusk-network/date-picker";

	let min = new Date(1990, 0, 1);
	let max = new Date();

	let dateString = "";
	let date = null;

	function onSelect(e) {
		dateString = new Date(Date.parse(e.detail)).toLocaleDateString();
	}
</script>

<p>Selected Date: {dateString}</p>
<p>Selected Date: {date ? date : ""}</p>
<br />
<DatePicker on:date="{onSelect}" bind:value="{date}" min="{min}" max="{max}" />
