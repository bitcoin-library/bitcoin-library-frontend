import { client } from "$lib/elastic/elastic"
import { json } from '@sveltejs/kit';


 export async function POST(event) {
  const esRes = await client.search({
      index: 'mongo-data',
      query: {
        match_all: { },
      },
      size: 12,
      track_total_hits: true
    })
  return json(esRes)
 }
