import type { ActionReturn } from "svelte/action";

export type OutsideClickEvent<T extends Element = Element> = CustomEvent<{
  target: EventTarget & Node;
}> & {
  currentTarget: T;
};

export declare function outsideClick<T extends Element = Element>(
  node: T
): ActionReturn<
  undefined,
  { "on:outsideclick": (evt: OutsideClickEvent<T>) => void }
> & { destroy: () => void };
