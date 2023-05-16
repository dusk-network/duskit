<script>
	import { logEvent } from "histoire/client";
	import Control from "@dusk-network/control";

	export let Hst;
</script>

<Hst.Story title="Form" group="components">
	<Control on:click="{(event) => logEvent('click', event)}">
		<input type="text" value="Form example" />
	</Control>
	<Control on:click="{(event) => logEvent('click', event)}">
		<input type="text" value="Form example" />
	</Control>
	<Control on:click="{(event) => logEvent('click', event)}">
		<input type="button" value="Submit" />
	</Control>
</Hst.Story>
