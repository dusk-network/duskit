import * as store from "./stores/store.js";

export function createContext() {
	store.init_module();
}
