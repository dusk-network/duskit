<script>
	import Control from "@dusk-network/control";
	import TextField from "@dusk-network/text-field";
</script>

<Control width="full" label="Control label" let:id>
	<TextField name="control_test" placeholder="A controlled text field" id="{id}" />
</Control>
