<script>
	import Control from "@dusk-network/control";
	import TextField from "@dusk-network/text-field";
	import Button from "@dusk-network/button";

	function onClick() {}
	function onMouseover() {}
	let state = "warning";
</script>

<Control
	width="full"
	buttonPostfix="{true}"
	on:click="{onClick}"
	on:mouseover="{onMouseover}"
	let:id
>
	<Button circle="{true}" slot="buttonPostfix">Postfixed</Button>
	<TextField id="{id}" state="{state}" />
</Control>
