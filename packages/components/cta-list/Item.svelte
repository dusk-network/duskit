<li class="duk-cta-list__item">
	<slot name="heading" />
	<slot />
	{#if $$slots.content}
		<div class="duk-cta-list__item--content">
			<slot name="content" />
		</div>
	{/if}
</li>
