<script>
	import Drawer from "@dusk-network/drawer";
	import Icon from "@dusk-network/icon";

	let items = [
		{
			id: 1,
			icon: "view-dashboard-outline",
			text: "Dashboard",
			path: "/components/organisms/drawer/Drawer/",
			disabled: false,
		},
		{
			id: 2,
			icon: "credit-card",
			text: "Shareholder Register",
			path: "",
			disabled: false,
		},
		{
			id: 3,
			icon: "contract",
			text: "Transaction History",
			path: "",
			disabled: true,
		},
	];
</script>

<Drawer items="{items}" activePath="/components/organisms/drawer/Drawer/">
	<svelte:fragment slot="logo">
		<Icon name="dusk-ticker" size="lg" />
	</svelte:fragment>
</Drawer>
