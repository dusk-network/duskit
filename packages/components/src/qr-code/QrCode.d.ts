import type { SvelteComponent } from "svelte";

import type { default as Suspense, SuspenseProps } from "../suspense/Suspense";

/**
 * We don't use `ControlledHtmlAttributes` here as
 * `SuspenseProps` is already "clean".
 */
export interface QrCodeProps extends Omit<
  SuspenseProps<string, "div">,
  "as" | "className" | "errorMessage" | "errorVariant" | "waitFor"
> {
  altText?: string;
  bgColor?: string;
  className?: string;
  qrColor?: string;
  size?: number;
  value?: string;
}

export default class QrCode extends SvelteComponent<QrCodeProps, {}, {}> {
  getRootElement(): Suspense<string, "div">;
}
