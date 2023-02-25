<script>
	import "./styles.css";
	import { getContext } from "svelte";
	import * as QRCode from "qrcode";
	import { onMount } from "svelte";
	import contexts from "@dusk-network/utilities/contexts.js";

	/**
	 * Value used in generating the QR Code
	 */
	export let value = "";

	/**
	 * Sets the width in pixels for the rendered QR Code
	 */
	export let width = 200;

	/**
	 * Sets the color of the QR Code
	 */
	export let qrColor = "#343434";

	/**
	 * Sets the background color of the QR Code
	 */
	export let bgColor = "#fff";

	/**
	 * Sets the alignment of the QR Code
	 */
	export let align = "center";

	const context = getContext("DUK:qr-code:context");

	let src;

	$: width, renderQr();
	$: qrColor, renderQr();
	$: bgColor, renderQr();

	function renderQr() {
		if (typeof window === "undefined") return;
		QRCode.toDataURL(value, {
			width: width,
			color: { dark: qrColor, light: bgColor },
		})
			.then((url) => {
				src = url;
			})
			.catch((err) => {
				console.error(err);
			});
	}

	onMount(() => {
		renderQr();
	});
</script>

<div
	class="{$$props.class || ''} duk-qr-code"
	class:duk-qr-code--left="{align === 'left'}"
	class:duk-qr-code--center="{align === 'center'}"
	class:duk-qr-code--right="{align === 'right'}"
	class:duk-qr-code--content="{context === contexts.QR_CODE.CONTENT}"
>
	<img src="{src}" alt="Key QR code" />
</div>
