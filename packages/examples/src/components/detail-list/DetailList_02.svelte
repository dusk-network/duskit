<script>
	import DetailList, { Item } from "@dusk-network/detail-list";
	import Icon from "@iconify/svelte";
	import emoticonHappy from "@iconify/icons-mdi/emoticon-happy";
</script>

<DetailList split="25/75">
	<Item>
		<svelte:fragment slot="icon">
			<Icon icon="{emoticonHappy}" />
		</svelte:fragment>
		<span slot="term"> Something </span>
		<svelte:fragment slot="definition">Defined</svelte:fragment>
	</Item>
	<Item>
		<svelte:fragment slot="icon">
			<Icon icon="{emoticonHappy}" />
		</svelte:fragment>
		<span slot="term"> Something else </span>
		<svelte:fragment slot="definition">Defined too</svelte:fragment>
	</Item>
</DetailList>
