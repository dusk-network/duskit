<script>
  /* eslint-disable import/named */
  import { logEvent } from "histoire/client";
  /* eslint-enable import/named */
	import { Button } from "@duskit/components";

	export let Hst;

	let properties = { disabled: false, text: "click me" };
</script>

<Hst.Story title="Button" group="components">

			<Button
				disabled="{properties.disabled}"
				on:click="{(event) => logEvent('click', event)}"
        text="{properties.text}"
			/>

	<svelte:fragment slot="controls">
		<Hst.Checkbox bind:value="{properties.disabled}" title="Disabled" />
		<!-- <Hst.Select bind:value="{context}" options="{Object.values(contexts.BUTTON)}" title="Context" /> -->
		<br />
		<hr />
		<br />
		<Hst.Json bind:value="{properties}" title="Current Props" />
	</svelte:fragment>
</Hst.Story>
