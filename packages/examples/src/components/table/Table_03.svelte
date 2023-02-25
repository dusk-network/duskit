<script>
	import Table, { Row, Datum } from "@dusk-network/table";
	import { apiData } from "./data.js";

	const settings = {
		sortable: true,
		rowsPerPage: 10,
		infinite: true,
		limiter: true,
		filter: false,
	};

	let rows;
	let isTransactionsLoading, isError;
	let transactions = [];

	transactions = [...apiData];

	$: {
		isTransactionsLoading = transactions === undefined ? true : false;
		isError = transactions instanceof Error ? true : false;
	}

	$: error = transactions instanceof Error ? transactions : null;
</script>

{#if isTransactionsLoading}
	<p>Loading...</p>
{:else if isError}
	<p>Error: {error}</p>
{:else}
	<Table
		data="{transactions}"
		bind:dataRows="{rows}"
		settings="{settings}"
		mobileBreakpoint="lg"
		type="uniform"
	>
		<h3 slot="title">Recent transactions</h3>
		<thead slot="head">
			{#if $rows}
				{#each $rows as _}
					<Row type="head">
						<Datum key="id">ID</Datum>
						<Datum key="first_name">Status</Datum>
						<Datum key="last_name">Time</Datum>
						<Datum key="email">Amount</Datum>
					</Row>
				{/each}
			{/if}
		</thead>
		<tbody>
			{#if $rows}
				{#each $rows as row, i}
					<Row
						active="{i === 2 ? true : false}"
						data="{row}"
						highlight="{true}"
						on:selected="{(event) => {
							console.log(event.detail);
						}}"
					>
						<Datum>{row.id}</Datum>
						<Datum>
							{row.status}
						</Datum>
						<Datum>
							{row.timeStamp}
						</Datum>
						<Datum>
							{row.amount}
						</Datum>
					</Row>
				{/each}
			{/if}
		</tbody>
	</Table>
{/if}
