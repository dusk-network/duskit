import { writable } from "svelte/store";
import { key } from "../key.js";
import { getContext, setContext } from "svelte";

const getOptions = () => {
	const createOptions = () => {
		const { subscribe, set } = writable({
			sortable: true,
			limiter: false,
			rowsPerPage: 20,
			filter: false,
			infinite: false,
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
					sortable: typeof opt.sortable === "boolean" ? opt.sortable : true,
					limiter: typeof opt.limiter === "boolean" ? opt.limiter : false,
					rowsPerPage: typeof opt.rowsPerPage === "number" ? opt.rowsPerPage : 20,
					filter: typeof opt.filter === "boolean" ? opt.filter : false,
					infinite: typeof opt.infinite === "boolean" ? opt.infinite : false,
				};
				options.set(parsed);
			},
		};
	};
	const options = createOptions();
	return options;
};

export const init_module = () => {
	const ctx = getContext(key);
	const options = getOptions();
	setContext(key, { ...ctx, options });
};
