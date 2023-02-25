<script>
	import { onMount } from "svelte";
	import Footer from "@dusk-network/footer";
	import CookieBanner from "@dusk-network/cookie-banner";
	import { isSettingsVisible, isCookieBannerVisible } from "$lib/store";
	import { setCookie, getCookie } from "$lib/helpers/cookie-utils.js";

	export let fields = {
		essential: true,
		tracking: false,
		analytics: false,
		marketing: false,
	};
	export let cookieConfig = {
		expires: 365,
	};
	export let gdprCookieName = "DUSK-GDPR";

	onMount(() => {
		if (!getCookie(gdprCookieName)) {
			isCookieBannerVisible.update(() => true);
		}
	});
</script>

<Footer type="minimal" variant="brand" />
<CookieBanner
	showBanner="{$isCookieBannerVisible}"
	acceptLabel="Accept All"
	settingsLabel="Settings"
	on:settings="{() => {
		isSettingsVisible.update(() => true);
	}}"
	on:accept="{() => {
		Object.keys(fields).forEach((v) => (fields[v] = true));
		setCookie(gdprCookieName, fields, cookieConfig);
	}}"
>
	<p>
		We and selected partners and related companies, use cookies and similar technologies as
		specified in our <a href="https://dusk.network/footer-pages/privacy-policies">Privacy Policy</a
		>. You agree to consent to the use of these technologies by clicking Accept All, or by
		continuing to browse this website. You can learn more about how we use cookies and set cookie
		preferences in Settings.
	</p>
</CookieBanner>
