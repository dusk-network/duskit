<svelte:options immutable={true} />

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

  /** @type {QrCodeProps["altText"]} */
  export let altText = defaultAltText;

  /** @type {QrCodeProps["bgColor"]} */
  export let bgColor = defaultBgColor;

  /** @type {QrCodeProps["className"]} */
  export let className = undefined;

  /** @type {QrCodeProps["qrColor"]} */
  export let qrColor = defaultQrColor;

  /** @type {QrCodeProps["size"]} */
  export let size = defaultSize;

  /** @type {QrCodeProps["value"]} */
  export let value = "";

  /** @type {Suspense<string, "div">} */
  let rootElement;

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

  $: classes = makeClassName(["dusk-qr-code", className]);
  $: qrOptions = {
    bgColor: bgColor ?? defaultBgColor,
    qrColor: qrColor ?? defaultQrColor,
    size: size ?? defaultSize,
  };
  $: qrText = value ?? "";
  $: dataUrl = getDataUrl(qrText, qrOptions);
</script>

<Suspense
  bind:this={rootElement}
  {...$$restProps}
  as="div"
  className={classes}
  errorMessage="Unable to generate QR code"
  errorVariant="banner"
  waitFor={dataUrl}
>
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
