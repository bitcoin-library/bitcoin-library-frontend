import { client } from '$lib/elastic/elastic';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { searchTerm, size, from } = await request.json();
	const esRes = await client.search({
		index: 'mongo-data',
		query: {
			multi_match: {
				query: searchTerm,
				fields: ['title', 'description', 'full_text']
			}
		},
		size: size,
		from: from,
		track_total_hits: true
	});
	return json(esRes);
}
