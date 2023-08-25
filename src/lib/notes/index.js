import { ndkStore } from "$lib/stores/ndk.js"
import { get } from "svelte/store";

const ndk = get(ndkStore)


export function getNotefromNdkEvent(event) {
  try {
    const note = {
      event: JSON.stringify(event.rawEvent()),
      id: event.id,
      nip19: event.encode(),
      authorPubkey: event.pubkey,
      content: event.content,
      createdAt: event.created_at,
      kind: event.kind,
      tags: event.tags
    };
    return note;
  } catch (error) {
    console.log(error);
  }
}

/**
 * @param {string} id
 * @returns {object} note
 */
export async function getNote(id) {
  const event = await ndk.fetchEvent({ ids: [id] })
  if (event) {
    const note = getNotefromNdkEvent(event);
    return note
  } else {
    return {}
  }
};
