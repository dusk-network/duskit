import type { SvelteComponent } from "svelte";

interface DeterministicIdProviderSlots {
  default: {};
}

type DeterministicIdProviderProps = {
  namespace?: string;
};

export default class DeterministicIdProvider extends SvelteComponent<
  DeterministicIdProviderProps,
  {},
  DeterministicIdProviderSlots
> {}
