import type { SvelteComponent } from "svelte";

import type { OmitSvelteSpecificProps } from "../dusk.components";
import type { default as Suspense, SuspenseProps } from "../suspense/Suspense";

export interface QrCodeProps
  extends OmitSvelteSpecificProps<
    Omit<
      SuspenseProps<string, "div">,
      "as" | "className" | "errorMessage" | "errorVariant" | "waitFor"
    >
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
