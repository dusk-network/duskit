<script>
	import "./styles.css";
	import { getContext, setContext } from "svelte";
	import contexts from "@dusk-network/utilities/contexts.js";

	const context = getContext("DUK:content:context");

	setContext("DUK:heading:context", contexts.HEADING.CONTENT);
	setContext("DUK:group:context", contexts.GROUP.CONTENT);
	setContext("DUK:address:context", contexts.ADDRESS.CONTENT);
	setContext("DUK:qr-code:context", contexts.QR_CODE.CONTENT);
	setContext("DUK:form:context", contexts.FORM.CONTENT);
	setContext("DUK:rich-text:context", contexts.RICH_TEXT.CONTENT);
	setContext("DUK:detail-list:context", contexts.DETAIL_LIST.CONTENT);
</script>

<div
	class="{$$props.class || ''} duk-content"
	class:duk-content--card="{context === contexts.CONTENT.CARD}"
>
	<slot />
</div>
