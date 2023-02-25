<script>
	// import { createEventDispatcher } from "svelte";
	import CookieBanner from "@dusk-network/cookie-banner";
	import Button from "@dusk-network/button";
	import Control from "@dusk-network/control";

	// const dispatch = createEventDispatcher();

	let showBanner = false;
</script>

<Control>
	<Button on:click="{() => (showBanner = !showBanner)}">Toggle Cookie Banner</Button>
</Control>
<CookieBanner acceptLabel="Accept" settingsLabel="Settings" showBanner="{showBanner}" on:settings>
	<p>
		We and selected partners and related companies, use cookies and similar technologies as
		specified in our Cookies Policy. You agree to consent to the use of these technologies by
		clicking Accept, or by continuing to browse this website. You can learn more about how we use
		cookies and set cookie preferences in Settings.
	</p>
</CookieBanner>
