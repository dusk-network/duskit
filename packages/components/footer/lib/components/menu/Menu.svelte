<script>
	import "./styles.css";

	export let navigation;
	export let variant;

	function isExternal(href) {
		return !href.startsWith("/");
	}
</script>

{#if navigation}
	<ul
		class="footer-menu"
		class:footer-menu--primary="{variant === 'primary'}"
		class:footer-menu--secondary="{variant === 'secondary'}"
	>
		{#each navigation.attributes.menu_items.data as item}
			<li class="menu__item">
				<a
					href="{item.attributes.href}"
					class="footer-menu__link"
					aria-current="page"
					title="{item.attributes.description}"
					target="{isExternal(item.attributes.href) ? '_blank' : null}"
					rel="{isExternal(item.attributes.href) ? 'nofollow' : null}"
				>
					{item.attributes.title}
				</a>
			</li>
		{/each}
	</ul>
{/if}
