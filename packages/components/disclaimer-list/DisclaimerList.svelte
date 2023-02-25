<script>
	import { setContext, getContext } from "svelte";
	import contexts from "@dusk-network/utilities/contexts.js";
	import "./styles.css";

	const context = getContext("DUK:disclaimer-list:context");

	setContext("DUK:heading:context", contexts.HEADING.DISCLAIMER_LIST);
</script>

<div
	class="{$$props.class || ''} duk-disclaimer-list"
	class:duk-disclaimer-list--card="{context === contexts.DISCLAIMER_LIST.CARD}"
	class:duk-disclaimer-list--content="{context === contexts.DISCLAIMER_LIST.CONTENT}"
>
	<slot name="heading" />
	<ul class="duk-disclaimer-list__list">
		<slot />
	</ul>
</div>
