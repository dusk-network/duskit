type IconProp = {
  path: string;
  position?: "after" | "before";
  size?: IconSize;
};

type ButtonSize = "normal" | "small";

type BadgeVariant = "neutral" | "success" | "warning" | "error";

/**
 * Removed the "primary" variant for now.
 * Will be reinstated later when we formalize our language.
 */
type ButtonVariant = "secondary" | "tertiary" | "quaternary";

type GapSize = "small" | "normal" | "large";

type IconSize = "small" | "normal" | "large";

type GroupedSelectOptions = Record<string, SelectOption[] | string[]>;

type SelectOption = {
  disabled?: boolean;
  label?: string;
  value: string;
};

type SuspenseErrorVariant = "alert" | "details";

type TextboxTypes =
  | "email"
  | "hidden"
  | "multiline"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "url";

type TooltipType = "error" | "info" | "success" | "warning";

type NavListProp = NavListItem[];

type NavListItem = {
  title: string;
  link: string;
};
