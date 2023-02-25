<script>
	import { createEventDispatcher, setContext, getContext } from "svelte";
	import contexts from "@dusk-network/utilities/contexts.js";
	import Breadcrumb, { Item } from "@dusk-network/breadcrumb";
	import { key } from "./key.js";
	import { createContext } from "./context.js";
	import { onMount } from "svelte";
	import "./styles.css";

	/**
	 * Sets the maximum number of steps in the Wizard.
	 */
	export let stepCount = 2;

	const dispatch = createEventDispatcher();
	const context = getContext("DUK:wizard:context");

	setContext(key, {});
	createContext();
	const { step } = getContext(key);

	const next = () => {
		step.increment();
	};
	const previous = () => {
		if ($step > 0) {
			step.decrement();
		}
	};

	setContext("DUK:form:context", contexts.FORM.WIZARD);
	setContext("DUK:progress-bar:context", contexts.PROGRESS_BAR.WIZARD);
	setContext("DUK:breadcrumb:context", contexts.BREADCRUMB.WIZARD);
	setContext("DUK:wizard:state", {
		step,
		next,
		previous,
	});

	const handleExit = () => {
		if ($step === 1) {
			dispatch("exit");
		} else {
			step.decrement();
		}
	};

	$: $step, dispatch("step", $step);

	onMount(() => {
		dispatch("step", $step);
	});
</script>

<div
	class="{$$props.class || ''} duk-wizard"
	class:duk-wizard--card="{context === contexts.WIZARD.CARD}"
>
	<Breadcrumb on:exit="{handleExit}">
		<Item>Step {$step} of {stepCount}</Item>
		<slot name="title" />
	</Breadcrumb>
	<slot name="progress-bar" steps="{stepCount}" step="{$step}" />
	<slot next="{next}" previous="{previous}" />
</div>
