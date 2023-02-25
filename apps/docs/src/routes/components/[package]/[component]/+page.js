import code from "@duskit-example";

/**
 * @type {import('@sveltejs/kit').Load}
 */
export async function load({ params, parent }) {
	const data = await parent();
	const meta = data.components.data[params.package][params.component];
	const examples = await import("@dusk-network/duskit-examples");

	return {
		meta,
		examples,
		code,
	};
}
