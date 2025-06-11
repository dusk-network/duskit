import type { SvelteComponent } from "svelte";
import type {
  HTMLInputAttributes,
  HTMLTextareaAttributes,
} from "svelte/elements";

import type { OmitSvelteSpecificProps } from "../dusk.components";

export type TextboxType =
  | "email"
  | "hidden"
  | "multiline"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "url";

export type TextboxProps<T extends TextboxType = "text"> =
  OmitSvelteSpecificProps<
    T extends "multiline"
      ? Omit<HTMLTextareaAttributes, "value">
      : Omit<HTMLInputAttributes, "type" | "value">
  > & {
    className?: string;
    type?: T;
    value?: T extends "number" ? number : string;
  };

interface TextboxEvents {
  blur: FocusEvent & { currentTarget: HTMLInputElement };
  focus: FocusEvent & { currentTarget: HTMLInputElement };
  input: Event & { currentTarget: HTMLInputElement };
  keydown: KeyboardEvent & { currentTarget: HTMLInputElement };
  paste: ClipboardEvent & { currentTarget: HTMLInputElement };
}

export default class Textbox<T extends TextboxType> extends SvelteComponent<
  TextboxProps<T>,
  TextboxEvents,
  {}
> {
  focus(): void;
  getRootElement(): HTMLDivElement;
  select(): void;
}
