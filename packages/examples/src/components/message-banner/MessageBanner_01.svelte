<script>
	import MessageBanner from "@dusk-network/message-banner";
	import Button from "@dusk-network/button";
	import Control from "@dusk-network/control";

	let showBanner;
</script>

<Control>
	<Button on:click="{() => (showBanner = !showBanner)}">Toggle Message Banner</Button>
</Control>
<MessageBanner
	variant="brand"
	icon="alert-outline"
	buttonLabel="Understood"
	showBanner="{showBanner}"
>
	<p>
		We and selected partners and related companies, use cookies and similar technologies as
		specified in our Cookies Policy. You agree to consent to the use of these technologies by
		clicking Accept, or by continuing to browse this website. You can learn more about how we use
		cookies and set cookie preferences in Settings.
	</p>
</MessageBanner>
