<script>
	import Button from "@dusk-network/button";
	import Control from "@dusk-network/control";
	import TextField from "@dusk-network/text-field";
	import Toggle from "@dusk-network/toggle";
	import Group from "@dusk-network/group";
	import FileUpload from "@dusk-network/file-upload";
	import Form from "@dusk-network/form";

	let schema = {
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		password_confirmation: "",
		services_option: "",
		marketing_email: false,
		terms: false,
		file: null,
	};

	let fields = {
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		password_confirmation: "",
		services_option: "",
		marketing_email: false,
		terms: false,
		file: null,
	};

	let submitted = false;
	let uploaded = false;

	function formSubmit() {
		submitted = true;
		if (schema.isValidSync(fields)) {
			uploaded = true;
			submitted = false;
			alert("submit form");
		} else {
			uploaded = false;
		}
	}
</script>

<Form
	class="sb-example"
	submitted="{submitted}"
	schema="{schema}"
	fields="{fields}"
	submitHandler="{formSubmit}"
>
	<Control width="half" label="First name" name="first_name" let:id let:state>
		<TextField
			type="text"
			placeholder="Elon"
			id="{id}"
			state="{state}"
			bind:value="{fields.first_name}"
		/>
	</Control>
	<Control width="half" label="Last name" name="last_name" let:id let:state>
		<TextField
			type="text"
			placeholder="Dusk"
			id="{id}"
			state="{state}"
			bind:value="{fields.last_name}"
		/>
	</Control>
	<Control width="full" label="Email" name="email" let:id let:state>
		<TextField type="email" id="{id}" state="{state}" bind:value="{fields.email}" />
	</Control>
	<Control width="half" label="Password" name="password" let:id let:state>
		<TextField type="password" state="{state}" bind:value="{fields.password}" id="{id}" />
	</Control>
	<Control width="half" label="Confirm password" name="password_confirmation" let:id let:state>
		<TextField
			type="password"
			state="{state}"
			name="password_confirmation"
			bind:value="{fields.password_confirmation}"
			id="{id}"
		/>
	</Control>
	<Control
		width="full"
		let:state
		label="How do you intend to use our services?"
		group="{true}"
		name="services_option"
	>
		<Group>
			<Toggle
				type="radio"
				variant="{state}"
				name="services_option"
				value="trading"
				bind:group="{fields.services_option}">Trading</Toggle
			>
			<Toggle
				type="radio"
				variant="{state}"
				name="services_option"
				value="staking"
				bind:group="{fields.services_option}">Staking</Toggle
			>
			<Toggle
				type="radio"
				variant="{state}"
				name="services_option"
				value="hodl"
				bind:group="{fields.services_option}">HODL</Toggle
			>
			<Toggle
				type="radio"
				variant="{state}"
				name="services_option"
				value="other"
				bind:group="{fields.services_option}">Other</Toggle
			>
		</Group>
	</Control>
	<Control width="full" name="file" let:id let:state>
		<FileUpload
			id="{id}"
			state="{state}"
			uploaded="{uploaded}"
			on:inputFile="{(event) => (fields.file = event.detail.file)}"
		/>
	</Control>
	<Control width="full" let:id let:state name="marketing_email">
		<Toggle
			type="checkbox"
			variant="{state}"
			name="marketing_email"
			id="{id}"
			bind:value="{fields.marketing_email}"
		>
			I would like to receive marketing emails from Dusk Network and affiliated partners.
		</Toggle>
	</Control>
	<Control width="full" let:id let:state name="terms">
		<Toggle type="checkbox" variant="{state}" name="terms" id="{id}" bind:value="{fields.terms}">
			I agree to the terms and conditions and all that good stuff.
		</Toggle>
	</Control>
	<Control width="full">
		<Button type="submit" size="lg">Submit</Button>
	</Control>
</Form>
