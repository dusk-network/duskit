import { base } from "$app/paths";
import { redirect } from "@sveltejs/kit";

/**
 * @type {import('@sveltejs/kit').Load}
 */
export async function load({ parent }) {
	const data = await parent();
	throw redirect(301, `${base}/components/${Object.keys(data.components.data)[0]}`);
}
