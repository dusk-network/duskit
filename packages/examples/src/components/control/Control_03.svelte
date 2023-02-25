<script>
	import Control from "@dusk-network/control";
	import Toggle from "@dusk-network/toggle";

	let state = "warning";
</script>

<Control width="full" label="Control label" let:id>
	<Toggle id="{id}" type="radio" state="{state}">Radio example</Toggle>
</Control>
