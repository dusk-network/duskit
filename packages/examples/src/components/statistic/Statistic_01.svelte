<script>
	import Statistic from "@dusk-network/statistic";
	import Icon from '@iconify/svelte';
  import emoticonHappy from '@iconify/icons-mdi/emoticon-happy';
</script>

<Statistic>
	<svelte:fragment slot="icon">
		<Icon icon={emoticonHappy} />
	</svelte:fragment>
	<p>$108.048.497</p>
</Statistic>
