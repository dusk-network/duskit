<script>
	import Navbar from "@dusk-network/navbar";
	import DropDown from "@dusk-network/drop-down";
	import Logo from "@dusk-network/logo";
	import Icon from "@dusk-network/icon";
	import Menu, { Item } from "@dusk-network/menu";
</script>

<Navbar appName="sb-demo" id="sb-example-nav">
	<svelte:fragment slot="logo">
		<Logo />
	</svelte:fragment>
	<svelte:fragment slot="networks">
		<Menu orientation="horizontal" name="Network Navigation">
			<Item>
				<DropDown options="{['Testnet', 'Mainnet']}" />
			</Item>
		</Menu>
	</svelte:fragment>
	<svelte:fragment slot="apps">
		<Menu orientation="horizontal" name="Portal Navigation">
			<Item href="javascript:;" active="{true}">Explorer</Item>
			<Item href="javascript:;">Wallet</Item>
			<Item href="javascript:;">Staking</Item>
		</Menu>
	</svelte:fragment>
	<svelte:fragment slot="links">
		<Menu orientation="horizontal" name="Developer Links">
			<Item href="https://shop.dusk.network">
				<Icon name="tshirt-crew-outline" /><span>Shop</span>
			</Item>
		</Menu>
	</svelte:fragment>
	<svelte:fragment slot="navigation">
		<Menu orientation="horizontal" name="App Navigation">
			<Item href="javascript:;">Chain Info</Item>
			<Item href="javascript:;" active>Blocks</Item>
			<Item href="javascript:;">Transactions</Item>
		</Menu>
	</svelte:fragment>
</Navbar>
