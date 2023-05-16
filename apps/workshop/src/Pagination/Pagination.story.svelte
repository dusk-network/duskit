<script>
	// import { logEvent } from "histoire/client";
	import { writable } from "svelte/store";
	import Pagination from "@dusk-network/pagination";

	export let Hst;

	let articles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	let pageNumber = writable(1);
</script>

<Hst.Story title="Pagination" group="components">
	Page: {$pageNumber}
	<Pagination itemsPerPage="{3}" pageNumber="{pageNumber}" items="{articles}" />
</Hst.Story>
