import { base } from "$app/paths";
export const prerender = true;
export const trailingSlash = "always";

/**
 * @type {import('@sveltejs/kit').Load}
 */
export async function load({ fetch }) {
	const res = await fetch(`${base}/api/components`);

	if (res.ok) {
		const components = await res.json();
		return {
			components,
		};
	}
}
