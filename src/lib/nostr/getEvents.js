
import { ndk } from "./ndk.js";

/**
 * @param {string} id
 *
 */
export const getEvents = async (ids) => {
  // Create a filter
  const filter = { kinds: [1], ids: ids };

  // Will return only the first event
  const events = await ndk.fetchEvents(filter);
  console.log("fetched events", events)
  return events

}
