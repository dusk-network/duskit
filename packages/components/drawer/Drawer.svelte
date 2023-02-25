<script>
	import "./styles.css";
	import { breakpoints, sizes } from "@dusk-network/utilities";
	import { onMount } from "svelte";

	/**
	 * Provides the necessary data for each item present in the Drawer component
	 */
	export let items;

	/**
	 * Sets the `id` of the Drawer if set, otherwise the ID is generated.
	 * @type {string}
	 */
	export let id = "__DUK-drawer" + Math.random().toString(36);

	/**
	 * Used to set the active state on a drawer item based on page url path
	 */
	export let activePath;

	/**
	 * Mobile breakpoint
	 * @type { "sm" | "md" | "lg" | "xl" | "xxl"}
	 */
	export let breakpoint = sizes.DRAWER.LARGE;

	let toggleDrawer = false;
	let drawerWidth = 0;
	let drawerVisible, clientWidth, listStyle, breakpointWidth;

	if (clientWidth >= breakpointWidth) {
		toggleDrawer = true;
	} else {
		toggleDrawer = false;
	}

	$: {
		switch (breakpoint) {
			case sizes.DRAWER.SMALL:
				breakpointWidth = breakpoints.SM;
				break;
			case sizes.DRAWER.MEDIUM:
				breakpointWidth = breakpoints.MD;
				break;
			case sizes.DRAWER.LARGE:
				breakpointWidth = breakpoints.LG;
				break;
			case sizes.DRAWER.XL:
				breakpointWidth = breakpoints.XL;
				break;
			case sizes.DRAWER.XXL:
				breakpointWidth = breakpoints.XXL;
				break;
			default:
				breakpointWidth = breakpoints.LG;
		}
	}

	$: {
		if (clientWidth >= breakpointWidth) {
			listStyle = toggleDrawer ? `width:${drawerWidth}px` : "width:64px";
		} else {
			listStyle = toggleDrawer ? `height:${items.length * 40 + 10}px` : "height:0px";
		}
	}

	onMount(() => {
		let collection =
			document.getElementById(id).childNodes[document.getElementById(id).childNodes.length - 1]
				.children;
		let collectionArr = Array.from(collection);
		collectionArr.pop();
		collectionArr.forEach((item) => {
			if (item.clientWidth > drawerWidth) {
				drawerWidth = item.clientWidth + 48;
			}
		});
		toggleDrawer = false;
		drawerVisible = "visibility: visible";
	});

	function handleToggle() {
		toggleDrawer = !toggleDrawer;
	}
</script>

<svelte:window bind:innerWidth="{clientWidth}" />

{#if items}
	<div
		id="{id}"
		class="{$$props.class || ''} duk-drawer"
		class:duk-drawer--sm="{breakpoint === 'sm'}"
		class:duk-drawer--md="{breakpoint === 'md'}"
		class:duk-drawer--lg="{breakpoint === 'lg'}"
		class:duk-drawer--xl="{breakpoint === 'xl'}"
		class:duk-drawer--xxl="{breakpoint === 'xxl'}"
		style="{drawerVisible}"
	>
		<div class="duk-drawer__header">
			<div on:click="{handleToggle}" on:keypress="{handleToggle}">
				{#if !toggleDrawer}
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2Z"
						></path></svg
					>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
						></path></svg
					>
				{/if}
			</div>
			<div class="duk-drawer__header--logo">
				<slot name="logo" />
			</div>
		</div>
		<ul class="duk-drawer__list" style="{listStyle}">
			{#each items as item}
				<li
					class="duk-drawer__item"
					class:duk-drawer__collapsed="{!toggleDrawer}"
					class:duk-drawer__item--disabled="{item.disabled}"
					class:duk-drawer__item--active="{activePath === item.path && !item.disabled}"
				>
					<a href="{item.path}">
						<div class="duk-drawer__item--text">{item.text}</div>
					</a>
				</li>
			{/each}
			<li
				on:click="{handleToggle}"
				on:keypress="{handleToggle}"
				class="duk-drawer__item duk-drawer__item--toggle"
			>
				{#if !toggleDrawer}
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M22 12a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2a10 10 0 0 1 10 10m-2 0a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8m-4.6 4.6L10.8 12l4.6-4.6L14 6l-6 6l6 6l1.4-1.4Z"
						></path></svg
					>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M22 12a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2a10 10 0 0 1 10 10m-2 0a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8M8.6 16.6l4.6-4.6l-4.6-4.6L10 6l6 6l-6 6l-1.4-1.4Z"
						></path></svg
					>
				{/if}
			</li>
		</ul>
	</div>
{/if}
