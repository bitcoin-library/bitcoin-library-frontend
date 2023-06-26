
// import { NDKEvent } from "@nostr-dev-kit/ndk";
import { ndk } from "./ndk.js";
import { user } from "$lib/stores.js";
import { get } from "svelte/store";
import { NDKNip07Signer, NDKEvent } from "@nostr-dev-kit/ndk";

/**
 * @param {string[]} selectedLists - List ids
 * @param {string} resourceEventId - Id of the event to add to the list
 */
export const addResourceToLists = async (selectedLists, resourceEventId, index = null) => {
  // FIXME reuse ndk object from ndk.js
  const nip07signer = new NDKNip07Signer();
  ndk.signer = nip07signer
  await nip07signer.user().then(async (user) => {
    if (!!user.npub) {
      console.log("Permission granted to read their public key:", user.npub);
    }
  });
  const promises = selectedLists.map(async (listID) => {
    console.log(get(user))
    const event = new NDKEvent(ndk);
    const listName = get(user).lists
      .find(l => l.id === listID)
      .tags
      .find(t => t[0] === "d")
    [1]
    const existingEvents = get(user).lists
      .find(l => l.id === listID)
      .tags
      .filter(t => t[0] !== "d")
    console.log("listName", listName)
    console.log("existingEvents", existingEvents)
    console.log(resourceEventId)
    event.kind = 30001;
    event.content = "";
    if (index === null) {
      event.tags = [
        ["d", listName],
        ...(existingEvents.length ? existingEvents : []),
        ["e", resourceEventId]
      ]
    } else {
      existingEvents.splice(index + 1, 0, ["e", resourceEventId]);
      console.log("inserted event in existing events", existingEvents)
      event.tags = [
        ["d", listName],
        ...existingEvents
      ]
      console.log("tags", event.tags)
    }
    console.log(event)
    await event.sign(ndk.signer)
    await ndk.publish(event)
    console.log("published list")
    // update lists
  });
  await Promise.all(promises)
  user.updateLists(ndk, get(user).pk)
}
