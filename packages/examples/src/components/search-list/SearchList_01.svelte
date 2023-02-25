<script>
	import SearchList from "@dusk-network/search-list";
	import RichText from "@dusk-network/rich-text";
	import DetailList, { Item } from "@dusk-network/detail-list";
	import { tokens } from "./data.js";

	let searchResults;
</script>

<SearchList data="{tokens}" bind:dataSearchResults="{searchResults}">
	{#if $searchResults}
		<DetailList>
			{#each $searchResults as token}
				<Item>
					<svelte:fragment slot="icon">
						{#if token.image}
							<div>
								<img src="{token.image}" alt="symbol" />
							</div>
						{/if}
					</svelte:fragment>
					<svelte:fragment slot="term">
						<RichText>
							<p>{token.token}</p>
						</RichText>
					</svelte:fragment>
					<svelte:fragment slot="definition">
						<RichText align="right">
							<p>{token.amount}</p>
						</RichText>
					</svelte:fragment>
				</Item>
			{/each}
		</DetailList>
	{/if}
</SearchList>
