<script>
	import Wizard, { Step } from "@dusk-network/wizard";
	import Button from "@dusk-network/button";
</script>

<Wizard stepCount="{2}">
	<h3 slot="title">Wizard title</h3>
	<Step number="{1}" let:next>
		step 1
		<Button on:click="{next}">Next</Button>
	</Step>
	<Step number="{2}" let:previous>
		step 2
		<Button on:click="{previous}">Back</Button>
	</Step>
</Wizard>
