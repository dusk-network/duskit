<script>
	import { setContext, createEventDispatcher, afterUpdate } from "svelte";
	import Menu, { Item } from "@dusk-network/menu";
	import DropDown from "@dusk-network/drop-down";
	import contexts from "@dusk-network/utilities/contexts.js";

	export let networks;
	export let selectedNetwork;

	const dispatch = createEventDispatcher();

	let disabled = true;
	let index = selectedNetwork ? networks.indexOf(selectedNetwork) : 0;

	setContext("DUK:menu:context", contexts.MENU.NAVBAR);

	afterUpdate(() => {
		disabled = false;
	});
</script>

<Menu orientation="horizontal" name="Network Navigation">
	<Item>
		<DropDown
			on:select="{(event) => {
				dispatch('network', {
					network: event.detail,
				});
				index = networks.indexOf(event.detail);
			}}"
			options="{networks}"
			selectedIndex="{index}"
			disabled="{disabled}"
		/>
	</Item>
</Menu>
