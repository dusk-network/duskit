<script>
	import { logEvent } from "histoire/client";
	import Accordion, { Item } from "@dusk-network/accordion";

	export let Hst;
</script>

<Hst.Story title="Accordion" group="components">
	<Accordion on:click="{(event) => logEvent('click', event)}">
		<Item title="First Item">First item content...</Item>
		<Item title="Second Item">Second item content...</Item>
		<Item title="Third Item">Third item content...</Item>
		<Item title="Fourth Item">Fourth item content...</Item>
	</Accordion>
</Hst.Story>
