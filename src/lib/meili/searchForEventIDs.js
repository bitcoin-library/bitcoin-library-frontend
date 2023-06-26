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

/**
 * @param {string[]} eventIDs
 *
 */
export async function searchForEventIDs(eventIDs) {
  const promises = (eventIDs.map(async (eventID) => {
    const search = await index.search("",
      {
        filter: [`eventID = ${eventID}`]
      });
    return { [eventID]: search.hits[0] }
  }))
  const resources = await Promise.all(promises)
  return resources
}
