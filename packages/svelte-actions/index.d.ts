import type { ActionReturn } from "svelte/action";

export type OutsideClickEvent<T extends Element = Element> = CustomEvent<{
  originalEvent: MouseEvent | PointerEvent;
}> & {
  currentTarget: T;
};

export interface OutsideClickOptions {
  enabled: boolean;
}

export declare function outsideClick<T extends Element = Element>(
  node: T,
  options: OutsideClickOptions
): ActionReturn<
  OutsideClickOptions,
  { "on:outsideclick": (evt: OutsideClickEvent<T>) => void }
> & {
  destroy: () => void;
  update: (newOptions: OutsideClickOptions) => void;
};
