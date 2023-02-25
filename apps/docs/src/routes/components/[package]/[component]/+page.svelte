<script>
	import { afterNavigate, beforeNavigate } from "$app/navigation";
	import { Highlight } from "svelte-highlight";
	import RichText from "@dusk-network/rich-text";
	import { page } from "$app/stores";
	import { javascript } from "svelte-highlight/languages";
	import "svelte-highlight/styles/mellow-purple.css";
	// import { isSettingsVisible } from "$lib/store.js";

	export let data;

	let examples;

	afterNavigate(async () => {
		examples = data.examples.components[$page.params.component];
	});

	beforeNavigate(async () => {
		examples = undefined;
	});

	const determineType = (prop) => {
		const typeTag = prop.tags.find(({ tag }) => tag === "type");
		let type;

		if (typeTag) ({ type } = typeTag);
		else if (prop.value && /^['"`].+?['"`]$/.test(prop.value)) {
			type = "string";
		} else {
			try {
				type = typeof JSON.parse(prop.value);
			} catch {
				type = "any";
			}
		}

		return type;
	};
</script>

<RichText class="mb-10 w-full max-w-full">
	<h1>{$page.params.component}</h1>

	<h2>Installation</h2>
	<pre>
    <code>
      npm i -D @dusk-network/{$page.params.package}
    </code>
  </pre>

	<h2>Props</h2>
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Type</th>
				<th>Required</th>
				<th>Default</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.entries(data.meta.props) as prop}
				<tr>
					<td>{prop[0]}</td>
					<td>{determineType(prop[1])}</td>
					<td>{prop[1]["required"]}</td>
					<td>{prop[1]["value"]}</td>
					<td>{prop[1]["description"]}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</RichText>

<RichText class="mb-10 w-full max-w-full">
	<h2>Examples</h2>
</RichText>

{#if examples}
	{#each Object.entries(examples) as example, index}
		<RichText>
			<h3>Example {index + 1}</h3>
		</RichText>
		<div class="my-10">
			<svelte:component this="{example[1]}" />
		</div>
		<Highlight
			class="mb-10"
			language="{javascript}"
			code="{data.code['@dusk-network']['duskit-examples'][example[0]]}"
		/>
	{/each}
{:else}
	<RichText class="mb-10 w-full max-w-full">
		<p>No examples found!</p>
	</RichText>
{/if}
