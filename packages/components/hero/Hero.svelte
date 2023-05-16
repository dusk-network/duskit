<script>
	import { setContext } from "svelte";
	import contexts from "@dusk-network/utilities/contexts.js";
	import "./styles.css";

	setContext("DUK:button:context", contexts.BUTTON.HERO);
	setContext("DUK:text:context", contexts.TEXT.HERO);
	setContext("DUK:heading:context", contexts.HEADING.HERO);
</script>

<div
	class="{$$props.class || ''} duk-hero"
	class:duk-hero--with-image="{$$slots.image}"
	class:duk-hero--with-cta="{$$slots.cta}"
>
	<slot name="introduction" />
	<slot name="cta" />
	<slot name="image" />
</div>
