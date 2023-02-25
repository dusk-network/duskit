<script>
	import DetailList, { Item } from "@dusk-network/detail-list";
</script>

<DetailList>
	<Item>
		<svelte:fragment slot="term">Something</svelte:fragment>
		<svelte:fragment slot="definition">Defined</svelte:fragment>
	</Item>
	<Item>
		<svelte:fragment slot="term">Something else</svelte:fragment>
		<svelte:fragment slot="definition">Defined too</svelte:fragment>
	</Item>
</DetailList>
