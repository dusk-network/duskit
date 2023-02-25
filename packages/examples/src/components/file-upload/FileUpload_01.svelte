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
