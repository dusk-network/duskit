export type OmitSvelteSpecificProps<T> = {
  [K in keyof T as K extends
    | `on:${string}`
    | `bind:${string}`
    | "class"
    | "style"
    ? never
    : K]: T[K];
};

export type GapSize = "small" | "default" | "medium" | "large";

export type IconProp = {
  path: string;
  position?: "after" | "before";
  size?: IconSize;
};

export type IconSize = "small" | "default" | "large";

export type OptionItem = {
  disabled?: boolean;
  label?: string;
  value: string;
};

export type StatusType = "error" | "info" | "success" | "warning";
