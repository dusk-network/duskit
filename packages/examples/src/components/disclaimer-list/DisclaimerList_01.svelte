<script>
	import DisclaimerList, { Item } from "@dusk-network/disclaimer-list";
	import Icon from "@dusk-network/icon";
	import RichText from "@dusk-network/rich-text";
	import Heading from "@dusk-network/heading";
</script>

<DisclaimerList>
	<svelte:fragment slot="heading">
		<Heading variant="danger">
			<svelte:fragment slot="icon">
				<Icon name="alert-outline" />
			</svelte:fragment>
			<h1>Warning</h1>
		</Heading>
	</svelte:fragment>
	<Item>
		<svelte:fragment slot="icon">
			<Icon name="safe" size="xxxl" variant="danger" />
		</svelte:fragment>
		<RichText size="sm">
			<h2>Don't Lose It</h2>
			<p>If you lose your keystore file, your wallet will be lost.</p>
		</RichText>
	</Item>
	<Item>
		<svelte:fragment slot="icon">
			<Icon name="eye-outline" size="xxxl" variant="danger" />
		</svelte:fragment>
		<RichText size="sm">
			<h2>Don't Share It</h2>
			<p>
				Anyone with your keystore file can access your funds.<br /> Beware of malicious phishing sites.
			</p>
		</RichText>
	</Item>
	<Item>
		<svelte:fragment slot="icon">
			<Icon name="content-save-alert-outline" size="xxxl" variant="danger" />
		</svelte:fragment>
		<RichText size="sm">
			<h2>Store It Securely</h2>
			<p>Secure it like the milions of dollars it may one day be worth</p>
		</RichText>
	</Item>
</DisclaimerList>
