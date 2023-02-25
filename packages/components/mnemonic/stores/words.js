import { writable, derived } from "svelte/store";
import { shuffle } from "@dusk-network/utilities/array-utils.js";

export const words = writable([]);
export const compared = writable([]);
export const shuffled = derived(words, ($words) => {
	const shuffled = [...$words];
	return shuffle(shuffled);
});
