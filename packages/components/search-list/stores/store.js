import { getContext, setContext } from "svelte";
import { writable, derived } from "svelte/store";
import { key } from "../key.js";

// function createTokens() {
//   const { subscribe, set, update } = writable([]);
//   return {
//     subscribe,
//     update,
//     set,
//     reset: () => set([]),
//   };
// }

// export const store = createTokens();
// export const searchTerm = writable("");

// export const searchResults = derived([store, searchTerm], ([$store, $searchTerm]) => {
//   return $store.filter((item) => item.token.toLocaleLowerCase().indexOf($searchTerm) !== -1);
// });

const createData = () => {
	const { subscribe, set, update } = writable([]);
	return {
		subscribe,
		update,
		set,
		reset: () => set([]),
	};
};

function getResults() {
	const store = createData();

	const searchTerm = writable("");

	const searchResults = derived([store, searchTerm], ([$store, $searchTerm]) => {
		$store = $store.filter((item) => {
			return item.token.toLocaleLowerCase().indexOf($searchTerm) !== -1;
		});
		return $store;
	});

	return { store, searchTerm, searchResults };
}

export function init_module() {
	const ctx = getContext(key);
	const { store, searchTerm, searchResults } = getResults();
	setContext(key, { ...ctx, store, searchTerm, searchResults });
}
