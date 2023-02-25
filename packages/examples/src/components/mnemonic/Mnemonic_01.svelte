<script>
	import Mnemonic from "@dusk-network/mnemonic";
	import DropDown from "@dusk-network/drop-down";
	import types from "@dusk-network/utilities/types.js";

	function onComplete(e) {
		console.log(e);
	}
	function onPassed(e) {
		console.log(e);
	}
	const seed = [
		"oyster",
		"close",
		"apple",
		"unfold",
		"wood",
		"alone",
		"during",
		"storm",
		"pulp",
		"glow",
		"album",
		"shop",
	];
	let type = types.MNEMONIC.PREVIEW;
	const length = 12;
	//Drop-down prop and event are used just to display different Mnemnonic types
	const options = [types.MNEMONIC.PREVIEW, types.MNEMONIC.AUTHENTICATE, types.MNEMONIC.CONFIRM];
	function onSelect(event) {
		type = event.detail;
	}
</script>

<p>Mnemonic type:</p>
<DropDown options="{options}" on:select="{onSelect}" />
<br />
<Mnemonic
	on:complete="{onComplete}"
	on:passed="{onPassed}"
	seed="{seed}"
	type="{type}"
	length="{length}"
/>
