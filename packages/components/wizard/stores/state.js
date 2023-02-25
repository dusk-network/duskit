import { writable } from "svelte/store";
import { getContext, setContext } from "svelte";
import { key } from "../key.js";

function getStep() {
	const getStore = () => {
		const store = writable(1);
		return {
			subscribe: store.subscribe,
			increment: () => store.update((store) => store + 1),
			decrement: () => store.update((store) => store - 1),
			reset: () =>
				store.update((store) => {
					store = 0;
					return store;
				}),
		};
	};
	const step = getStore();
	return { step };
}

export function init_module() {
	let ctx = getContext(key);
	const { step } = getStep();
	setContext(key, { ...ctx, step });
}
