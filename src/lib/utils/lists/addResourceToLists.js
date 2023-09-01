import { ndkStore } from "$lib/stores/ndk.js";
import { user } from "$lib/stores/user.js";
import { get } from "svelte/store";
import { NDKNip07Signer, NDKEvent } from "@nostr-dev-kit/ndk";

/**
 * @param {string[]} selectedListIDs List ids
 * @param {string} resourceEventId Id of the event to add to the list
 * @param {number} [index] index to insert the note
 */
export const addResourceToLists = async (selectedListIDs, resourceEventId, index = null) => {
  const ndk = get(ndkStore);
  const nip07signer = new NDKNip07Signer();
  ndk.signer = nip07signer
  await nip07signer.user().then(async (user) => {
    if (!!user.npub) {
      console.log("Permission granted to read their public key:", user.npub);
    }
  });
  for (const listID of selectedListIDs) {
    const event = new NDKEvent(ndk);
    const selectedList = get(user).lists.find(l => l.eventId === listID)
    const listName = selectedList.name
    const existingEvents = selectedList.publicItems
    event.kind = 30001;
    event.content = "";
    if (index === null) {
      event.tags = [
        ["d", selectedList.name],
        ...(existingEvents.length ? existingEvents : []),
        ["e", resourceEventId]
      ]
    } else {
      existingEvents.splice(index + 1, 0, ["e", resourceEventId]);
      event.tags = [
        ["d", selectedList.name],
        ["name", listName],
        ...existingEvents
      ]
    }
    await event.sign(ndk.signer)
    await event.publish()
  };
  // update user lists
  await user.updateLists(get(user).pk)
}
