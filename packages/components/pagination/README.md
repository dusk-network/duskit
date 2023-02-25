# Duskit - Pagination

[![Storybook](https://img.shields.io/badge/Storybook-Component_Playground-%23FF4785?style=flat&logo=storybook)](https://dusk-network.github.io/duskit/?path=/story/components-atoms-pagination)
[![Docs](https://img.shields.io/badge/Documentation-%235E35CF?style=flat)](https://dusk-network.github.io/duskit/docs/components/pagination)

## Installation

```
npm i -D @dusk-network/pagination
```

## Usage

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=../../../examples/src/pagination/Pagination_01.svelte) -->
<!-- The below code snippet is automatically added from ../../../examples/src/pagination/Pagination_01.svelte -->

```svelte
<script>
	import Pagination from "@dusk-network/pagination";
	import { data } from "./data.js";
	import { writable } from "svelte/store";

	const pageNumber = writable(1);
	const items = data;
	const itemsPerPage = 10;
</script>

<Pagination pageNumber="{pageNumber}" items="{items}" itemsPerPage="{itemsPerPage}" />
```

<!-- MARKDOWN-AUTO-DOCS:END -->
