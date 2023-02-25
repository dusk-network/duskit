<script>
	import { setContext } from "svelte";
	import { contexts } from "@dusk-network/utilities";
	import "./styles.css";

	/**
	 * The title to be displayed with the statistic.
	 * */
	export let title = "";

	setContext("DUK:chip:context", contexts.CHIP.STATISTIC);
</script>

<div class="{$$props.class || ''} duk-statistic">
	<div class="duk-statistic__content">
		<div class="duk-statistic__icon">
			<slot name="icon" />
		</div>
		<div>
			<h3 class="duk-statistic__title">{title}</h3>
			<p class="duk-statistic__value"><slot /></p>
		</div>
	</div>
</div>
