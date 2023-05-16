<script>
	import Footer from "@dusk-network/footer";
	import mock from "./mock.json";
	export let Hst;

	let content = mock;
	let darkMode = false;
	let padding = null;
</script>

<Hst.Story title="Footer" group="components">
	<svelte:fragment slot="controls">
		<Hst.Json bind:value="{content}" title="Content" />
		<Hst.Checkbox bind:value="{darkMode}" title="Dark mode?" />
		<Hst.Text bind:value="{padding}" title="Block Padding" />
	</svelte:fragment>
	<Footer content="{content}" theme="{darkMode && 'dark'}" padding="{padding}" />
</Hst.Story>
