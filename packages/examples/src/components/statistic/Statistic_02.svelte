<script>
	import Statistic from "@dusk-network/statistic";
	import Icon from "@dusk-network/icon";
	import Group from "@dusk-network/group";
</script>

<Group grid="{true}">
	<Statistic title="DUSK Price">
		<svelte:fragment slot="icon">
			<Icon name="dusk-ticker" variant="brand" size="xxxl" />
		</svelte:fragment>
		<p>$0,2947 (<span class="text-green-500">+1.76%</span>)</p>
	</Statistic>
	<Statistic title="Estimated Total Staked">
		<svelte:fragment slot="icon">
			<Icon name="database" variant="brand" size="xxxl" />
		</svelte:fragment>
		<p>100.000.000 DUSK</p>
	</Statistic>
	<Statistic title="Market Cap">
		<svelte:fragment slot="icon">
			<Icon name="chart-areaspline" variant="brand" size="xxxl" />
		</svelte:fragment>
		<p>$108.048.497</p>
	</Statistic>
	<Statistic title="Transactions">
		<svelte:fragment slot="icon">
			<Icon name="pound-box-outline" variant="brand" size="xxxl" />
		</svelte:fragment>
		<p>150786</p>
	</Statistic>
	<Statistic title="Average Gas Price">
		<svelte:fragment slot="icon">
			<Icon name="gauge" variant="brand" size="xxxl" />
		</svelte:fragment>
		<p>1.54 DUSK</p>
	</Statistic>
	<Statistic title="Provisioners">
		<svelte:fragment slot="icon">
			<Icon name="contacts" variant="brand" size="xxxl" />
		</svelte:fragment>
		<p>88,880</p>
	</Statistic>
</Group>
