<script>
	import Wizard, { Step } from "@dusk-network/wizard";
	import Button from "@dusk-network/button";
	import ProgressBar from "@dusk-network/progress-bar";
</script>

<Wizard stepCount="{2}">
	<div slot="progress-bar" let:steps let:step>
		<ProgressBar steps="{steps}" step="{step}" />
	</div>
	<Step number="{1}" let:next>
		step 1
		<Button on:click="{next}">Next</Button>
	</Step>
	<Step number="{2}" let:previous>
		step 2
		<Button on:click="{previous}">Back</Button>
	</Step>
</Wizard>
