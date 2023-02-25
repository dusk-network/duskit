import * as state from "./stores/state.js";

export function createContext() {
	state.init_module();
}
