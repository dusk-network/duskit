import { base } from "$app/paths";
import { redirect } from "@sveltejs/kit";

/**
 * @type {import('@sveltejs/kit').Load}
 */
export async function load({ params, parent }) {
	const data = await parent();
	const component = Object.keys(data.components.data[params.package])[0];
	throw redirect(301, `${base}/components/${params.package}/${component}`);
}
