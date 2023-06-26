import { ndk } from "./ndk.js";

/**
 * @param {string} id
 *
 */
export const getEvent = async (id, kinds = [30001]) => {
  // Create a filter
  const filter = { kinds: kinds, ids: [id] };

  // Will return only the first event
  const event = await ndk.fetchEvent(filter);
  return event

}
