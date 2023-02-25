<script>
	import StepList, { Item } from "@dusk-network/step-list";
	import RichText from "@dusk-network/rich-text";
</script>

<StepList>
	<Item iconName="eye-outline">
		<svelte:fragment slot="title">
			<RichText>Title</RichText>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<RichText size="sm">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas risus nunc, auctor sit
				amet odio sed, ultrices consectetur orci. Donec id dolor semper, porta tellus sit amet,
				eleifend nisl.
			</RichText>
		</svelte:fragment>
	</Item>
	<Item iconName="brightness-5">
		<svelte:fragment slot="title">
			<RichText>Title</RichText>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<RichText size="sm">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas risus nunc, auctor sit
				amet odio sed, ultrices consectetur orci. Donec id dolor semper, porta tellus sit amet,
				eleifend nisl.
			</RichText>
		</svelte:fragment>
	</Item>
	<Item iconName="key-outline">
		<svelte:fragment slot="title">
			<RichText>Title</RichText>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<RichText size="sm">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas risus nunc, auctor sit
				amet odio sed, ultrices consectetur orci. Donec id dolor semper, porta tellus sit amet,
				eleifend nisl.
			</RichText>
		</svelte:fragment>
	</Item>
</StepList>
