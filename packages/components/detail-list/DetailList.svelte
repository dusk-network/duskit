<script>
	import { setContext, getContext } from "svelte";
	import contexts from "@dusk-network/utilities/contexts.js";
	import "./styles.css";

	/**
	 * Determines the split between the two columns.
	 * @type { "50/50" | "25/75" | "75/25" }
	 */
	export let split = "50/50";

	const context = getContext("DUK:detail-list:context");

	setContext("DUK:icon:context", contexts.ICON.DETAIL_LIST);
	setContext("DUK:text:context", contexts.TEXT.DETAIL_LIST);
	setContext("DUK:group:context", contexts.GROUP.DETAIL_LIST);
	setContext("DUK:chip:context", contexts.CHIP.DETAIL_LIST);
</script>

<dl
	class="{$$props.class || ''} duk-detail-list"
	class:duk-detail-list--50-50="{split === '50/50'}"
	class:duk-detail-list--25-75="{split === '25/75'}"
	class:duk-detail-list--75-25="{split === '75/25'}"
	class:duk-detail-list--card="{context === contexts.DETAIL_LIST.CARD}"
	class:duk-detail-list--search-list="{context === contexts.DETAIL_LIST.SEARCH_LIST}"
>
	<slot />
</dl>
