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
  /**
   * Determines whether the column is hidden or not.
   * If omitted the column will be visible.
   *
   * @default false
   */
  hidden?: boolean;

  /**
   * The text to display in the column header.
   * If omitted, the value of the `name` property will be used.
   */
  label?: string;

  /**
   * The key of the data object `T` to be displayed in this column.
   * This value is used to access the data for each row.
   */
  name: K;

  /**
   * Optional custom renderer for the cell's content.
   * Can be a function that returns a string, or an object specifying a
   * Svelte component to render. If omitted, the data value is cast to a string.
   */
  renderer?: TableCellDataComponentRenderer<T, K> | TableCellDataRenderer<T, K>;

  /**
   * Determines if the column can be sorted by the user.
   * If omitted, the column will not be sortable.
   *
   * @default false
   */
  sortable?: boolean;
};

export type TableCustomDescriptor<T extends Record<string, any>> = {
  /**
   * Determines whether the column is hidden or not.
   * If omitted the column will be visible.
   *
   * @default false
   */
  hidden?: boolean;

  /**
   * The text to display in the column header.
   * If omitted, the value of the `name` property will be used.
   */
  label?: string;

  /**
   * A unique identifier for a custom column that does not directly map
   * to a key of the data object `T`.
   */
  name: Exclude<string, keyof T>;

  /**
   * Required renderer for the custom column's content.
   * Can be a function that returns a string, or an object specifying a
   * Svelte component to render, based on the entire row data.
   */
  renderer:
    | TableCellDataCustomComponentRenderer<T>
    | TableCellCustomRenderer<T>;

  /**
   * Determines if the column can be sorted by the user.
   * If omitted, the column will not be sortable.
   *
   * @default false
   */
  sortable?: boolean;
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
