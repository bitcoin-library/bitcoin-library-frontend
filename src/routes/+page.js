import { handleSearch } from '$lib/search';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const results = await fetch("/api/search", {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      'content-type': 'application/json'
    }
  })
  const res = await results.json()
  return { res }
}
