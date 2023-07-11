import { json } from '@sveltejs/kit';
import { handleSearch } from '$lib/meili/search';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { searchTerm = "", filters = [] } = await request.json()
  const results = await handleSearch(searchTerm, filters)
  return json(results);
}


