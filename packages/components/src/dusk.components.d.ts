type NativeEventKeys = Extract<keyof GlobalEventHandlers, `on${string}`>;

export type ControlledHtmlAttributes<
  SourceAttributes extends Record<string, any>,
  ControlledKeys extends keyof SourceAttributes = never,
> = {
  [K in keyof SourceAttributes as K extends
    | `bind:${string}`
    | "class"
    | ControlledKeys
    | NativeEventKeys
    | `on:${string}`
    | "style"
    ? never
    : K]: SourceAttributes[K];
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
