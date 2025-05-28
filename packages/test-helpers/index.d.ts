import type { SvelteComponent } from "svelte";
import type { Readable } from "svelte/store";
import type { render } from "@testing-library/svelte";

export declare function getAsHTMLElement(
  container: HTMLElement,
  selector: string
): HTMLElement;

export declare class IntersectionObserverMock extends IntersectionObserver {}

export declare function mockReadableStore<T>(initialValue: T): Readable<T> & {
  getMockedStoreValue(): T;
  setMockedStoreValue(value: T): void;
};

type CreateRenderer = (
  component: Parameters<typeof render>[0],
  options?: Parameters<typeof render>[1],
  renderOptions?: Parameters<typeof render>[2]
) => ReturnType<typeof render>;

export declare const renderWithSimpleContent: CreateRenderer;

export declare function renderWithSlots(slots: {
  default: string;
}): CreateRenderer;

type SvelteComponentConstructor<
  Props extends Record<string, any> = Record<string, any>,
> = new (options: { target: Element; props?: Props }) => SvelteComponent;

export declare interface SlotContentProps<
  C extends SvelteComponentConstructor = SvelteComponentConstructor,
> {
  component: C;
  componentOptions: C extends SvelteComponentConstructor<infer P> ? P : never;
  text: string;
}

export declare class SlotContent<
  C extends SvelteComponentConstructor = SvelteComponentConstructor,
> extends SvelteComponent<SlotContentProps<C>, {}, { default: {} }> {}
