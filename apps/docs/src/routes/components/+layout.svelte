<script>
	import Sidebar from "$lib/components/Sidebar.svelte";

	export let data;

	// $: groupTitle = $page.params.group;
	// $: navTitle = groupTitle.charAt(0).toUpperCase() + groupTitle.slice(1);
</script>

<div class="container">
	<div class="flex flex-row flex-wrap py-4">
		<aside class="w-full px-2 lg:w-1/4 lg:pr-20">
			<Sidebar title="Component Packages" components="{data.components.data}" />
		</aside>
		<div role="main" class="w-full px-2 pt-1 lg:w-3/4">
			<slot components="{data.components.data}" />
		</div>
	</div>
</div>
