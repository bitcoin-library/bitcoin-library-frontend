/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const results = await fetch("/api/search", {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      'content-type': 'application/json'
    }
  })
  const search = await results.json()
  return { search }
}
