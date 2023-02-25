<script>
	import { getContext, createEventDispatcher } from "svelte";
	import contexts from "@dusk-network/utilities/contexts.js";
	import RichText from "@dusk-network/rich-text";
	import "./styles.css";

	/**
	 * Sets the `id` of the FileUpload if set, otherwise the ID is generated.
	 * @type {string}
	 */
	export let id = "__DUK-file-upload" + Math.random().toString(36);

	/**
	 * Sets the `name` attribute on the File Upload.
	 */
	export let name = "";

	/**
	 * Sets the uploaded state of the File Upload, must be initialized as false.
	 * When true file input will be disabled.
	 */
	export let uploaded = false;

	const dispatch = createEventDispatcher();
	const context = getContext("DUK:file-upload:context");

	let fields = {
		file: null,
	};
	let isFileLoaded = false;

	const dropFile = (e) => {
		fields.file = e.dataTransfer.files;
		isFileLoaded = true;
		dispatch("inputFile", fields);
	};

	const inputFile = (e) => {
		if (e.target.files.length === 1) {
			fields.file = e.target.files;
			isFileLoaded = true;
		} else {
			fields.file = null;
			isFileLoaded = false;
		}
		dispatch("inputFile", fields);
	};
</script>

<div
	class="{$$props.class || ''} duk-file-upload duk-file-upload__dropzone"
	class:duk-file-upload--control="{context === contexts.FILE_UPLOAD.CONTROL}"
	class:duk-file-upload--form="{context === contexts.FILE_UPLOAD.FORM}"
	on:dragover|preventDefault
	on:dragenter|preventDefault
	on:drop|preventDefault="{dropFile}"
>
	<div class="duk-file-upload__layout">
		{#if !isFileLoaded && !uploaded}
			<RichText align="center">
				<p class="duk-file-upload__text">
					Drag your file here
					<br />or<br />
					<span>Upload File</span>
				</p>
			</RichText>
		{/if}
		{#if isFileLoaded && !uploaded}
			<RichText align="center">
				<p class="duk-file-upload__text">{fields.file[0].name}</p>
			</RichText>
		{/if}
		{#if isFileLoaded && uploaded}
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="m23 12l-2.44 2.78l.34 3.68l-3.61.82l-1.89 3.18L12 21l-3.4 1.47l-1.89-3.18l-3.61-.82l.34-3.69L1 12l2.44-2.79l-.34-3.68l3.61-.81L8.6 1.54L12 3l3.4-1.46l1.89 3.18l3.61.82l-.34 3.68L23 12m-2.67 0L18.5 9.89l.24-2.79L16 6.5l-1.42-2.43L12 5.18L9.42 4.07L8 6.5l-2.74.59l.24 2.79L3.67 12l1.83 2.1l-.24 2.8l2.74.6l1.42 2.43L12 18.81l2.58 1.11L16 17.5l2.74-.61l-.24-2.79l1.83-2.1Z"
				></path></svg
			>
		{/if}
	</div>
	<input
		id="{id}"
		name="{name}"
		aria-describedby="{id}-message"
		class="duk-file-upload__input"
		type="file"
		disabled="{uploaded}"
		on:change="{inputFile}"
	/>
</div>
