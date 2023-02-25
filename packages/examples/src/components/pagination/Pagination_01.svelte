<script>
	import Pagination from "@dusk-network/pagination";
	import { data } from "./data.js";
	import { writable } from "svelte/store";

	const pageNumber = writable(1);
	const items = data;
	const itemsPerPage = 10;
</script>

<Pagination pageNumber="{pageNumber}" items="{items}" itemsPerPage="{itemsPerPage}" />
