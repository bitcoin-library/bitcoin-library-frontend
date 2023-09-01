import { json } from '@sveltejs/kit';
import { handleSearch } from '$lib/meili/handleSearch.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { searchTerm = "", filters = [], offset = 0 } = await request.json()
  const search = await handleSearch(searchTerm, filters, offset)
  return json(search);
}


