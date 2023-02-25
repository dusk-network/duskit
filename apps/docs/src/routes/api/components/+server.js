import metadata from "@duskit-meta";
import { json } from "@sveltejs/kit";

export const prerender = true;

export async function GET() {
	const response = json({
		data: metadata,
	});
	return response;
}
