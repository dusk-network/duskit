<script>
	import Statistic from "@dusk-network/statistic";
	import Icon from "@dusk-network/icon";
	import Group from "@dusk-network/group";
	import Chip from "@dusk-network/chip";
</script>

<Group grid="{true}">
	<Statistic title="DUSK Price">
		<svelte:fragment slot="icon">
			<Icon name="dusk-ticker" variant="brand" size="xxxl" />
		</svelte:fragment>
		<Chip variant="danger">No data</Chip>
	</Statistic>
	<Statistic title="Estimated Total Staked">
		<svelte:fragment slot="icon">
			<Icon name="database" variant="brand" size="xxxl" />
		</svelte:fragment>
		<Chip variant="danger">No data</Chip>
	</Statistic>
	<Statistic title="Market Cap">
		<svelte:fragment slot="icon">
			<Icon name="chart-areaspline" variant="brand" size="xxxl" />
		</svelte:fragment>
		<Chip variant="danger">No data</Chip>
	</Statistic>
	<Statistic title="Transactions">
		<svelte:fragment slot="icon">
			<Icon name="pound-box-outline" variant="brand" size="xxxl" />
		</svelte:fragment>
		<Chip variant="danger">No data</Chip>
	</Statistic>
	<Statistic title="Average Gas Price">
		<svelte:fragment slot="icon">
			<Icon name="gauge" variant="brand" size="xxxl" />
		</svelte:fragment>
		<Chip variant="danger">No data</Chip>
	</Statistic>
	<Statistic title="Provisioners">
		<svelte:fragment slot="icon">
			<Icon name="contacts" variant="brand" size="xxxl" />
		</svelte:fragment>
		<Chip variant="danger">No data</Chip>
	</Statistic>
</Group>
