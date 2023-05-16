<script>
	import Menu from "./lib/components/menu";
	import Text from "@dusk-network/text";
	import Button from "@dusk-network/button";
	import Input from "@dusk-network/input";
	import "./styles.css";

	export let content;
	export let theme;
	export let padding;

	let footer;

	$: footer = content.attributes.footer;
	$: {
		if (content.attributes.footer.padding) {
			padding = content.attributes.footer.padding.replace(/([p])/g, "!$&");
		} else if (padding) {
			padding = padding.replace(/([p])/g, "!$&");
		} else {
			padding = content.attributes.footer.padding || padding;
		}
	}
</script>

{#if footer}
	<span class:dark="{theme === 'dark'}">
		<footer class="footer">
			<section class="footer__wrapper {padding}">
				<!-- {#if content.cta.data}
        {#if content.cta.data.attributes.cta[0].__component === "website.footer-cta-news"}
          <News content="{content.cta.data.attributes.cta[0]}" />
        {:else}
          <Link content="{content.cta.data.attributes.cta[0]}" />
        {/if}
      {/if} -->
				<div class="footer__layout">
					{#if footer.heading.heading}
						<h2 class="footer__heading">
							{@html footer.heading.heading}
						</h2>
					{/if}
					<div class="footer__menu">
						{#if footer.navigation.data.attributes.menus.data[0]}
							<Menu
								variant="primary"
								navigation="{footer.navigation.data.attributes.menus.data[0]}"
							/>
						{/if}
						<hr class="footer__separator" />
						{#if footer.navigation.data.attributes.menus.data[1]}
							<Menu
								variant="secondary"
								navigation="{footer.navigation.data.attributes.menus.data[1]}"
							/>
						{/if}
					</div>
					<div class="footer__last-chance">
						<!-- TODO Add to CMS -->
						<Text>Want to stay informed?</Text>
						<Input placeholder="Email" btnText="Subscribe" />
						<div class="footer__email">
							<input placeholder="Email" />
							<Button size="small">Subscribe</Button>
						</div>
					</div>

					<div class="footer__small-print">
						{#if footer.small_print}
							<small><Text size="x-small">{footer.small_print}</Text></small>
						{/if}
						{#if footer.navigation.data.attributes.menus.data[2]}
							<small>
								<Text size="x-small">
									{#each footer.navigation.data.attributes.menus.data[2].attributes.menu_items.data as item}
										<a href="{item.attributes.href}" title="{item.attributes.description}"
											>{item.attributes.title}</a
										>
									{/each}
								</Text>
							</small>
						{/if}
					</div>
				</div>
			</section>
		</footer>
	</span>
{/if}
