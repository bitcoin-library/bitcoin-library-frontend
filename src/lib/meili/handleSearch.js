import { get } from "svelte/store"
import { index } from "./index"
import { pagination } from "$lib/stores/search"

const buildFilters = (filters, attribute, meiliFilterAttribute) => {
  return filters
    .find(e => e.id === attribute)
    .attributes
    .filter(keyword => keyword.checked)
    .map(k => `${meiliFilterAttribute} = '${k.id}'`)
}

export async function handleSearch(searchTerm, filters, offset) {
  const searchSettings = {
    sort: [
      "created_at:desc"
    ],
    limit: get(pagination).resultsPerPage,
    offset: offset
  }
  const searchFilters = filters.length && [
    [...buildFilters(filters, "keywords", "keywordsAsIds")],
    [...buildFilters(filters, "resourceTypes", "resourceTypeAsIds")]
  ]

  const search = await index.search((searchTerm), {
    ...(filters.length && { filter: [...searchFilters] }),
    ...searchSettings,
  });
  return search
}

