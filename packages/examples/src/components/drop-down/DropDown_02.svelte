<script>
	import DropDown from "@dusk-network/drop-down";

	const options = ["option 1", "option 2", "option 3", "option 4", "option 5"];
	const dropUp = true;
	function onSelect() {
		//Triggered on new selected value
	}
</script>

<DropDown options="{options}" dropUp="{dropUp}" on:select="{onSelect}" />
