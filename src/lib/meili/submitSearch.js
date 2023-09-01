import { get } from "svelte/store"
import { searchTerm, pagination, filters, searchResults, totalHits } from '$lib/stores/search.js';


export const submitSearch = async (event) => {
  console.log("lib/search called")
  const result = await fetch("/api/search", {
    method: "POST",
    body: JSON.stringify({
      searchTerm: get(searchTerm),
      filters: get(filters),
      offset: get(pagination).resultsPerPage * (get(pagination).current - 1)
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
  const search = await result.json()
  searchResults.set(search.hits)
  totalHits.set(search.estimatedTotalHits)
  return search
}
