import { get } from "svelte/store"
import { searchTerm, searchResults, filters } from '$lib/stores';


export const handleSearch = async (event) => {
  const result = await fetch("/api/search", {
    method: "POST",
    body: JSON.stringify({ searchTerm: get(searchTerm), filters: get(filters) })
  })
  const res = await result.json()
  searchResults.set(res)
  return res
}
