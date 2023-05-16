<script>
	import { logEvent } from "histoire/client";
	import Card from "@dusk-network/card";

	export let Hst;
</script>

<Hst.Story title="Card" group="components">
	<Card on:click="{(event) => logEvent('click', event)}">
		<p>Card content</p>
	</Card>
</Hst.Story>
