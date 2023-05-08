import { index } from "$lib/meili/index"
import { get } from "svelte/store"
import { searchResults, searchTerm, filters } from "$lib/stores"

const buildFilters = (attribute, meiliFilterAttribute) => {
  return get(filters)
    .find(e => e.id === attribute)
    .attributes
    .filter(keyword => keyword.checked)
    .map(k => `${meiliFilterAttribute} = '${k.id}'`)
}

export async function handleSearch() {
  const search = await index.search(get(searchTerm), {
    filter: [
      [...buildFilters("keywords", "keywordsAsIds")],
      [...buildFilters("resourceTypes", "resourceTypeAsIds")]
    ]
  });
  searchResults.set(search.hits);
}
