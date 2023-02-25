<script>
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import Settings from "$lib/components/Settings.svelte";
	import { isSettingsVisible, theme } from "$lib/store.js";
	import "$lib/app.css";
	import "svelte-highlight/styles/github-dark.css";

	export let data;
</script>

<Navbar
	components="{data.components.data}"
	on:settings="{() => {
		isSettingsVisible.update(() => true);
	}}"
/>

<section>
	<slot />
</section>

<Footer />

<Settings showSettings="{$isSettingsVisible}" theme="{$theme}" />
