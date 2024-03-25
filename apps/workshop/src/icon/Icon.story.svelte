<script>
	import Icon from "@dusk-network/icon";
  import { mdiHome } from "@mdi/js";
	export let Hst;

	let properties = { className: "", disabled: false, isInStack: false, path: mdiHome,  role: ""};
</script>

<Hst.Story title="Icon" group="components">

  <Icon {...properties} />

	<svelte:fragment slot="controls">
		<Hst.Json bind:value="{properties}" title="Current Props" />
	</svelte:fragment>
</Hst.Story>
