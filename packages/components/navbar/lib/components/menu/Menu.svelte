<script>
	import { onMount } from "svelte";
	import { clickOutside } from "../../helpers/click-outside.js";
	import { detectPageChange } from "../..//helpers/detect-page-change.js";
	import { selectedSubmenu, hidden } from "../../store.js";
	import "./styles.css";

	export let navigation;

	function toggleSubmenu(submenu) {
		$selectedSubmenu = submenu === $selectedSubmenu ? null : submenu;
	}

	function isExternal(href) {
		return !href.startsWith("/");
	}

	onMount(() => {
		detectPageChange(() => {
			$selectedSubmenu = null;
		});
	});
</script>

{#if navigation}
	<ul class="navbar-menu">
		{#each navigation.data.attributes.menus.data as item}
			<li class="navbar-menu__item">
				<button
					on:click|stopPropagation="{() => toggleSubmenu(item.attributes.title)}"
					on:keyup|stopPropagation="{() => toggleSubmenu(item.attributes.title)}"
					class="navbar-menu__link"
					aria-current="page"
				>
					{item.attributes.title}
				</button>
				{#if $selectedSubmenu === item.attributes.title}
					<div class="navbar-submenu">
						<button
							class="navbar-submenu__back"
							on:click|stopPropagation="{() => toggleSubmenu(item.attributes.title)}"
							on:keypress|stopPropagation="{() => toggleSubmenu(item.attributes.title)}"
						>
							Back
						</button>
						<ul
							class="navbar-submenu__menu"
							use:clickOutside="{$selectedSubmenu === item.attributes.title}"
							on:outside="{() => {
								$selectedSubmenu = null;
								$hidden = true;
							}}"
						>
							{#each item.attributes.menu_items.data as submenu}
								<li class="navbar-submenu__item">
									<a
										href="{submenu.attributes.href}"
										target="{isExternal(submenu.attributes.href) ? '_blank' : null}"
										rel="{isExternal(submenu.attributes.href) ? 'nofollow' : null}"
										on:click="{() => {
											$selectedSubmenu = null;
											$hidden = true;
										}}"
										on:keyup="{() => {
											$selectedSubmenu = null;
											$hidden = true;
										}}"
									>
										<strong class="navbar-submenu__heading">{submenu.attributes.title}</strong>
										{#if submenu.attributes.description}
											<span class="navbar-submenu__description">
												{@html submenu.attributes.description}
											</span>
										{/if}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
{/if}
