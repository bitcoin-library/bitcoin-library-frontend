import { client } from '$lib/elastic/elastic';
import { buildSearch } from '$lib/elastic/helper';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { searchTerm, size, from, filters } = await request.json();
	const esRes = await client.search(buildSearch(searchTerm, size, from, filters));
	return json(esRes);
}
