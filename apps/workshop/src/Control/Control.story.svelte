<script>
	import { logEvent } from "histoire/client";
	import Control from "@dusk-network/control";

	export let Hst;
</script>

<Hst.Story title="Control" group="components">
	<Control on:click="{(event) => logEvent('click', event)}">
		<input type="text" value="Control example" readonly />
	</Control>
	<Control on:click="{(event) => logEvent('click', event)}">
		<input type="text" value="Control example" readonly />
	</Control>
	<Control on:click="{(event) => logEvent('click', event)}">
		<input type="button" value="Submit" readonly />
	</Control>
</Hst.Story>
