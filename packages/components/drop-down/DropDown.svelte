<script>
	import { number } from "svelte-i18n"; // eslint-disable-line
	import { createEventDispatcher, onMount, getContext } from "svelte";
	import contexts from "@dusk-network/utilities/contexts.js";
	import "./styles.css";

	/**
	 * Used as an array to hold the DropDown options
	 */
	export let options = [];

	/**
	 * Used to indicate the selected option
	 * @type {number}
	 */
	export let selectedIndex = 0;

	/**
	 * Sets the opened direction of the DropDown to up when true
	 */
	export let dropUp = false;

	/**
	 * Disables to the DropDown when true
	 */
	export let disabled = false;

	const dispatch = createEventDispatcher();
	const context = getContext("DUK:drop-down:context");

	let selectedOption = options[selectedIndex];
	let isOpen = false;

	function selectOption(value) {
		selectedOption = value;
		isOpen = false;
		dispatch("select", value);
	}

	$: selectedIndex, (selectedOption = options[selectedIndex]);
	$: scrollable = options.length > 5 ? true : false;
	$: listHeight = scrollable ? `height:${5 * 33 + 8}px` : "";

	onMount(() => {
		if (!disabled) {
			if (options.length === 0) {
				disabled = true;
				selectedOption = "No options";
			} else {
				disabled = false;
			}
			selectOption(selectedOption);
		}
	});
</script>

<div
	class="{$$props.class || ''} duk-drop-down"
	class:duk-drop-down--drop-up="{dropUp === true}"
	class:duk-drop-down--disabled="{disabled === true}"
	class:duk-drop-down--menu="{context === contexts.DROP_DOWN.MENU}"
>
	<div class="duk-drop-down__layout">
		<button type="button" class="duk-drop-down__button" on:click="{() => (isOpen = !isOpen)}">
			<span class="duk-drop-down__selected">
				{#if typeof selectedOption !== "object"}
					<span class="duk-drop-down__selected-label">{selectedOption}</span>
				{:else}
					<span class="duk-drop-down__selected-label">{selectedOption.name}</span>
				{/if}
			</span>
			<span class="duk-drop-down__button-icon" class:duk-drop-down__button-icon--open="{isOpen}">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4l-6 6Z"
					></path></svg
				>
			</span>
		</button>
		{#if isOpen && options}
			<div class="duk-drop-down__options">
				<ul
					tabindex="-1"
					role="listbox"
					aria-activedescendant="__DUK-drop-down-item-{options.indexOf(selectedOption)}"
					class="duk-drop-down__list"
					class:duk-drop-down__list--scrollable="{scrollable}"
					style="{listHeight}"
				>
					{#each options as option, i}
						<li
							id="__DUK-drop-down-item-{i}"
							role="option"
							aria-selected="{option === selectedOption}"
							class="duk-drop-down__item"
							on:click="{() => selectOption(option)}"
							on:keypress="{() => selectOption(option)}"
						>
							<div class="duk-drop-down__item-layout">
								{#if typeof option !== "object"}
									<span
										class="duk-drop-down__item-label"
										class:duk-drop-down__item-label--selected="{option === selectedOption}"
										>{option}</span
									>
								{:else}
									<span
										class="duk-drop-down__item-label"
										class:duk-drop-down__item-label--selected="{option.name ===
											selectedOption.name}">{option.name}</span
									>
								{/if}
							</div>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</div>
