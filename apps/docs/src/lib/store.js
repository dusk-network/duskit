import { writable } from "svelte/store";
import { localStore } from "./stores/local";

export const theme = localStore("theme", "dark");
export const isSettingsVisible = writable(false);
export const isCookieBannerVisible = writable(false);
