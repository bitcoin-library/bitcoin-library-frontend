import { searchForEventIDs } from '$lib/meili/searchForEventIDs';
import { getResourcesFromEventTags } from '$lib/utils/getResourcesFromEventTags';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { event } = await request.json()

  const resources = await getResourcesFromEventTags(event)
  console.log(resources)
  return json(resources)

}
