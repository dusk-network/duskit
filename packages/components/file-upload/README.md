# Duskit - FileUpload

[![Storybook](https://img.shields.io/badge/Storybook-Component_Playground-%23FF4785?style=flat&logo=storybook)](https://dusk-network.github.io/duskit/?path=/story/components-atoms-file-upload)
[![Docs](https://img.shields.io/badge/Documentation-%235E35CF?style=flat)](https://dusk-network.github.io/duskit/docs/components/file-upload)

## Installation

```
npm i -D @dusk-network/file-upload
```

## Usage

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=../../../examples/src/file-upload/FileUpload_01.svelte) -->
<!-- The below code snippet is automatically added from ../../../examples/src/file-upload/FileUpload_01.svelte -->

```svelte
<script>
	import FileUpload from "@dusk-network/file-upload";
	import Form from "@dusk-network/form";
	import Control from "@dusk-network/control";
	import Button from "@dusk-network/button";
	import * as yup from "yup";

	let schema = yup.object().shape({
		file: yup
			.mixed()
			.label("Upload file")
			.required("A file is required")
			.test("fileSize", "File too large", (value) => value && value[0].size <= 1000000)
			.test(
				"fileFormat",
				"Unsupported file format",
				(value) => value && ["image/png", "image/jpeg"].includes(value[0].type),
			),
	});

	// let schema = {
	//   file: null,
	// };

	let fields = {
		file: null,
	};

	let uploaded = false;
	let submitted = false;
	function formSubmit() {
		submitted = true;
		if (schema.isValidSync({ file: fields.file })) {
			uploaded = true;
			submitted = false;
			alert("submit form");
		} else {
			uploaded = false;
		}
	}
</script>

<Form submitted="{submitted}" schema="{schema}" fields="{fields}" submitHandler="{formSubmit}">
	<Control name="file" let:id let:state>
		<FileUpload
			id="{id}"
			state="{state}"
			uploaded="{uploaded}"
			on:inputFile="{(event) => (fields.file = event.detail.file)}"
		/>
	</Control>
	<Control>
		<Button type="submit" size="lg" variant="cta">Upload</Button>
	</Control>
</Form>
```

<!-- MARKDOWN-AUTO-DOCS:END -->
