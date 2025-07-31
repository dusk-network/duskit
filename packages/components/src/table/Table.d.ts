import type { SvelteComponent, ComponentProps } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import { OmitSvelteSpecificProps } from "../dusk.components";

type SvelteComponentConstructor = new (...args: any) => SvelteComponent;

export type TableCellDataComponentRenderer<
  T extends Record<string, any>,
  K extends keyof T,
  C extends SvelteComponentConstructor = SvelteComponentConstructor,
> = {
  component: C;
  getProps: (value: T[K], row: T) => ComponentProps<InstanceType<C>>;
};

export type TableCellDataRenderer<
  T extends Record<string, any>,
  K extends keyof T,
> = (value: T[K], row: T) => string;

export type TableCellCustomRenderer<T extends Record<string, any>> = (
  row: T
) => string;

export type TableCellDataCustomComponentRenderer<
  T extends Record<string, any>,
  C extends SvelteComponentConstructor = SvelteComponentConstructor,
> = {
  component: C;
  getProps: (row: T) => ComponentProps<InstanceType<C>>;
};

export type TableDataDescriptor<
  T extends Record<string, any>,
  K extends keyof T,
> = {
  label?: string;
  name: K;
  renderer?: TableCellDataComponentRenderer<T, K> | TableCellDataRenderer<T, K>;
  sortable: boolean;
};

export type TableCustomDescriptor<T extends Record<string, any>> = {
  label?: string;
  name: Exclude<string, keyof T>;
  renderer:
    | TableCellDataCustomComponentRenderer<T>
    | TableCellCustomRenderer<T>;
  sortable: boolean;
};

export type TableDescriptor<T extends Record<string, any>> =
  | {
      [K in keyof T]: TableDataDescriptor<T, K>;
    }[keyof T]
  | TableCustomDescriptor<T>;

export type TableSortState = {
  column: string;
  direction: "ascending" | "descending";
} | null;

export interface TableProps<T extends Record<string, any> = Record<string, any>>
  extends OmitSvelteSpecificProps<SvelteHTMLElements["table"]> {
  caption?: string;
  className?: string;
  data: T[];
  descriptors?: Array<TableDescriptor<T>>;
}

interface TableEvents {
  sort: CustomEvent<TableSortState>;
}

export default class Table<
  T extends Record<string, any> = Record<string, any>,
> extends SvelteComponent<TableProps<T>, TableEvents, {}> {
  getRootElement(): HTMLTableElement;
}
