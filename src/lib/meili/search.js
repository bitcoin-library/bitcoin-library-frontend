import { index } from "./index"

const buildFilters = (filters, attribute, meiliFilterAttribute) => {
  return filters
    .find(e => e.id === attribute)
    .attributes
    .filter(keyword => keyword.checked)
    .map(k => `${meiliFilterAttribute} = '${k.id}'`)
}

export async function handleSearch(searchTerm, filters) {
  if (filters.length) {
    const search = await index.search((searchTerm), {
      filter: [
        [...buildFilters(filters, "keywords", "keywordsAsIds")],
        [...buildFilters(filters, "resourceTypes", "resourceTypeAsIds")]
      ]
    });
    return search.hits
  } else {
    const search = await index.search((searchTerm), {
    });
    return search.hits

  }
}
