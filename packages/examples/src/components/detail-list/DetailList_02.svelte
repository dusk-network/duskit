<script>
	import DetailList, { Item } from "@dusk-network/detail-list";
	import Icon from "@dusk-network/icon";
</script>

<DetailList split="25/75">
	<Item>
		<svelte:fragment slot="icon">
			<Icon name="check-circle-outline" />
		</svelte:fragment>
		<span slot="term"> Something </span>
		<svelte:fragment slot="definition">Defined</svelte:fragment>
	</Item>
	<Item>
		<svelte:fragment slot="icon">
			<Icon name="check-circle-outline" />
		</svelte:fragment>
		<span slot="term"> Something else </span>
		<svelte:fragment slot="definition">Defined too</svelte:fragment>
	</Item>
</DetailList>
