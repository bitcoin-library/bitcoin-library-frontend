
import { getEvent } from '$lib/nostr/getEvent';
import { searchForEventIDs } from "$lib/meili/searchForEventIDs.js"

export const getResourcesFromEventTags = async (event) => {
  const tagsOfBookmarkedEvents = event.tags
    .filter(t => t[0] !== "d")
    .map(t => t[1])

  // fetch events from meili by event ids and render them
  const searchResults = await searchForEventIDs(tagsOfBookmarkedEvents)
  const promises = searchResults.map(async (r, index) => {
    if (r[tagsOfBookmarkedEvents[index]] !== undefined) {
      return { ...r[tagsOfBookmarkedEvents[index]], type: "LearningResource" }
    } else {
      const event = await getEvent(tagsOfBookmarkedEvents[index], [1])
      return { ...event }
    }
  })
  const resources = await Promise.all(promises)
  return resources

}

