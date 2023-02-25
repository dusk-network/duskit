import { writable } from "svelte/store";

const DEFAULT_TYPE = "preview";

const createOptions = () => {
	const { subscribe, set } = writable({
		type: DEFAULT_TYPE,
	});
	return {
		subscribe,
		set,
		get: () => {
			let $store;
			options.subscribe((store) => ($store = store));
			return $store;
		},
		update: (opt) => {
			const parsed = {
				type: typeof opt.type === "string" ? opt.type : DEFAULT_TYPE,
			};
			options.set(parsed);
		},
	};
};

export const options = createOptions();
