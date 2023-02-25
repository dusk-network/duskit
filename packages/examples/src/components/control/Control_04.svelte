<script>
	import Control from "@dusk-network/control";
	import DropDown from "@dusk-network/drop-down";

	function onClick() {}
	function onMouseover() {}
</script>

<Control width="full" dropDown="{true}" on:click="{onClick}" on:mouseover="{onMouseover}" let:id>
	<DropDown id="{id}" options="{[1, 2, 3, 4]}" />
</Control>
