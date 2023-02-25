<script>
	import Statistic from "@dusk-network/statistic";
	import Icon from '@iconify/svelte';
  import emoticonHappy from '@iconify/icons-mdi/emoticon-happy';
	import Group from "@dusk-network/group";
	import Chip from "@dusk-network/chip";
</script>

<Group grid="{true}">
	<Statistic title="DUSK Price">
		<svelte:fragment slot="icon">
			<Icon icon={emoticonHappy} />
		</svelte:fragment>
		<Chip variant="danger">No data</Chip>
	</Statistic>
	<Statistic title="Estimated Total Staked">
		<svelte:fragment slot="icon">
			<Icon icon={emoticonHappy} />
		</svelte:fragment>
		<Chip variant="danger">No data</Chip>
	</Statistic>
	<Statistic title="Market Cap">
		<svelte:fragment slot="icon">
			<Icon icon={emoticonHappy} />
		</svelte:fragment>
		<Chip variant="danger">No data</Chip>
	</Statistic>
	<Statistic title="Transactions">
		<svelte:fragment slot="icon">
			<Icon icon={emoticonHappy} />
		</svelte:fragment>
		<Chip variant="danger">No data</Chip>
	</Statistic>
	<Statistic title="Average Gas Price">
		<svelte:fragment slot="icon">
			<Icon icon={emoticonHappy} />
		</svelte:fragment>
		<Chip variant="danger">No data</Chip>
	</Statistic>
	<Statistic title="Provisioners">
		<svelte:fragment slot="icon">
			<Icon icon={emoticonHappy} />
		</svelte:fragment>
		<Chip variant="danger">No data</Chip>
	</Statistic>
</Group>
