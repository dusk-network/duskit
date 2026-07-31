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
    ? never
    : K]: SourceAttributes[K];
};

export type GapSize = "small" | "medium" | "large";

export type IconOptions = {
  path: string;
  position?: "after" | "before";
};

export type IconSize = "small" | "default" | "large";

export type OptionItem = {
  disabled?: boolean;
  label?: string;
  value: string;
};

export type StatusType = "error" | "info" | "success" | "warning";

export type SurfaceVariant = "layer" | "surface";
