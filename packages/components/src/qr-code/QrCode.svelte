<script>
  /** @typedef {import("./QrCode").QrCodeProps} QrCodeProps */

  import * as QRCode from "qrcode";
  import { createEventDispatcher } from "svelte";

  import { getErrorFrom } from "@duskit/error";
  import { makeClassName } from "@duskit/string";

  import { Suspense } from "../..";

  const defaultAltText = "QR Code";
  const defaultBgColor = "#fff";
  const defaultQrColor = "#101";
  const defaultSize = 200;

  /**
   * @typedef {Object} Props
   * @property {QrCodeProps["altText"]} [altText]
   * @property {QrCodeProps["bgColor"]} [bgColor]
   * @property {QrCodeProps["className"]} [className]
   * @property {QrCodeProps["qrColor"]} [qrColor]
   * @property {QrCodeProps["size"]} [size]
   * @property {QrCodeProps["value"]} [value]
   */

  /** @type {Props & { [key: string]: any }} */
  const {
    altText = defaultAltText,
    bgColor = defaultBgColor,
    className = undefined,
    qrColor = defaultQrColor,
    size = defaultSize,
    value = "",
    ...rest
  } = $props();

  /** @type {Suspense<string, "div">} */
  let rootElement = /** @type {Suspense<string, "div">} */ ($state());

  export const getRootElement = () => rootElement;

  const dispatch = createEventDispatcher();

  /**
   * @param {string} text
   * @param {{ bgColor: string, qrColor: string, size: number }} options
   * @returns {Promise<string>}
   */
  const getDataUrl = (text, options) =>
    QRCode.toDataURL(text, {
      color: {
        dark: options.qrColor,
        light: options.bgColor,
      },
      width: options.size,
    })
      .then((url) => {
        if (typeof url !== "string" || !url.trim()) {
          throw new Error("Unable to generate QR code");
        }

        return url;
      })
      .catch((failure) => {
        const error = getErrorFrom(failure);

        dispatch("error", error.message);

        return Promise.reject(error);
      });

  const classes = $derived(makeClassName(["dusk-qr-code", className]));
  const qrOptions = $derived({
    bgColor: bgColor ?? defaultBgColor,
    qrColor: qrColor ?? defaultQrColor,
    size: size ?? defaultSize,
  });
  const qrText = $derived(value ?? "");
  const dataUrl = $derived(getDataUrl(qrText, qrOptions));
</script>

<Suspense
  bind:this={rootElement}
  {...rest}
  as="div"
  className={classes}
  errorMessage="Unable to generate QR code"
  errorVariant="banner"
  waitFor={dataUrl}
>
  <!-- @migration-task: migrate this slot by hand, `success-content` is an invalid identifier -->
  <svelte:fragment slot="success-content" let:result>
    <img
      alt={altText ?? defaultAltText}
      class="dusk-qr-code__image"
      height={size ?? defaultSize}
      src={result}
      width={size ?? defaultSize}
    />
  </svelte:fragment>
</Suspense>
