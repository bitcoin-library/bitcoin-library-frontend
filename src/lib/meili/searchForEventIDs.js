import { index } from "./index"

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
