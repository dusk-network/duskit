<script>
	import Control from "@dusk-network/control";
	import Toggle from "@dusk-network/toggle";

	let state = "warning";
</script>

<Control width="full" label="Control label" let:id>
	<Toggle id="{id}" type="checkbox" state="{state}">Checkbox example</Toggle>
</Control>
