<script>
	import { getContext, setContext, createEventDispatcher } from "svelte";
	import { passwordStrength } from "check-password-strength";
	import ProgressBar from "@dusk-network/progress-bar";
	import contexts from "@dusk-network/utilities/contexts.js";
	import variants from "@dusk-network/utilities/variants.js";
	import "./styles.css";

	/**
	 * Sets the password value used by PasswordStrengh.
	 */
	export let password = "";

	let strength = 0;
	let variant = variants.PROGRESS_BAR.DANGER;

	$: passwordLevel = checkPassword(password);
	$: variant = getVariant(strength);

	setContext("DUK:progress-bar:context", contexts.PROGRESS_BAR.PASSWORD_STRENGTH);

	const MAX_STRENGTH = 4;
	const context = getContext("DUK:password-strength:context");
	const dispatch = createEventDispatcher();

	const checkPassword = (password) => {
		strength = passwordStrength(password).id + 1;
		dispatch("strength", strength);
		return passwordStrength(password).value;
	};

	const getVariant = (strength) => {
		let variant;
		switch (strength) {
			case 1:
				variant = variants.PROGRESS_BAR.DANGER;
				break;
			case 2:
				variant = variants.PROGRESS_BAR.DANGER;
				break;
			case 3:
				variant = variants.PROGRESS_BAR.WARNING;
				break;
			case 4:
				variant = variants.PROGRESS_BAR.SUCCESS;
				break;
			default:
				variant = variants.PROGRESS_BAR.DANGER;
				break;
		}

		return variant;
	};
</script>

<div
	class="{$$props.class || ''} duk-password-strength"
	class:duk-password-strength--control="{context === contexts.PASSWORD_STRENGTH.CONTROL}"
>
	<div class="duk-password-strength__label">
		<slot strength="{strength}" />
		<span>{passwordLevel}</span>
	</div>
	<ProgressBar variant="{variant}" steps="{MAX_STRENGTH}" step="{strength}" />
</div>
