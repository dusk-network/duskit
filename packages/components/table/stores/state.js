import { writable, readable } from "svelte/store";
import { getContext, setContext } from "svelte";
import { key } from "../key.js";

const createPageNumber = () => {
	const { options, rowCount } = getContext(key);
	const { subscribe, update } = writable(1);
	return {
		subscribe,
		update,
		set: (number) =>
			update((store) => {
				let $rowsPerPage, $rowCount;
				rowCount.subscribe((store) => ($rowCount = store));
				options.subscribe((store) => ($rowsPerPage = store.rowsPerPage));

				if (number >= 1 && number <= Math.ceil($rowCount / $rowsPerPage)) {
					store = parseInt(number);
				}
				// document.querySelector(`#${id.get()} .duk-table__table`).scrollTop = 0;
				return store;
			}),
	};
};

function getId() {
	const getStore = () => {
		const { subscribe } = readable("__DUK-table" + (Math.random() + 1).toString(36));
		return {
			subscribe,
			get: () => {
				let $store;
				id.subscribe((store) => ($store = store));
				return $store;
			},
		};
	};
	const id = getStore();
	return { id };
}

function getRowCount() {
	const rowCount = writable(0);
	return { rowCount };
}

function getState() {
	const pageNumber = createPageNumber();
	const tableWidth = writable(null);
	const activeRow = writable(null);
	return { pageNumber, tableWidth, activeRow };
}

export function init_module() {
	let ctx = getContext(key);
	const { id } = getId();
	setContext(key, { ...ctx, id });

	ctx = getContext(key);
	const { rowCount } = getRowCount();
	setContext(key, { ...ctx, rowCount });

	ctx = getContext(key);
	const { pageNumber, tableWidth, activeRow } = getState();
	setContext(key, { ...ctx, pageNumber, tableWidth, activeRow });
}
