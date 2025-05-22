import type { SvelteComponent } from "svelte";

export interface RerenderProps<T = any> {
  generateValue?: () => T;
  interval?: number;
}

interface RerenderSlots<T> {
  default: { value: T };
}

export default class Rerender<T> extends SvelteComponent<
  RerenderProps<T>,
  {},
  RerenderSlots<T>
> {}
