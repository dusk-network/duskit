type OmitSvelteSpecificProps<T> = {
  [K in keyof T as K extends
    | `on:${string}`
    | `bind:${string}`
    | "class"
    | "style"
    ? never
    : K]: T[K];
};

type GapSize = "small" | "default" | "medium" | "large";

type IconProp = {
  path: string;
  position?: "after" | "before";
  size?: IconSize;
};

type IconSize = "small" | "default" | "large";

type OptionItem = {
  disabled?: boolean;
  label?: string;
  value: string;
};

type StatusType = "error" | "info" | "success" | "warning";
