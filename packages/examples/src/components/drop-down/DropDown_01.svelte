<script>
	import DropDown from "@dusk-network/drop-down";

	const options = [
		{ name: "option 1" },
		{ name: "option 2" },
		{ name: "option 3" },
		{ name: "option 4" },
		{ name: "option 5" },
		{ name: "option 6" },
		{ name: "option 7" },
		{ name: "option 8" },
		{ name: "option 9" },
		{ name: "option 10" },
		{ name: "option 11" },
		{ name: "option 12" },
		{ name: "option 13" },
		{ name: "option 14" },
		{ name: "option 15" },
	];
	function onSelect() {
		//Triggered on new selected value
	}
</script>

<DropDown options="{options}" on:select="{onSelect}" />
