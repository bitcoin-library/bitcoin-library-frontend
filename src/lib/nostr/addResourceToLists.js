
// import { NDKEvent } from "@nostr-dev-kit/ndk";
import { ndk } from "./ndk.js";
import { user } from "$lib/stores.js";
import { get } from "svelte/store";
import { NDKNip07Signer, NDKEvent } from "@nostr-dev-kit/ndk";
import { getSelectedListFromID, getListName, getListEvents } from "./lists/utils.js";

/**
 * @param {string[]} selectedListIDs - List ids
 * @param {string} resourceEventId - Id of the event to add to the list
 */
export const addResourceToLists = async (selectedListIDs, resourceEventId, index = null) => {
  console.log("adding a resource to the list")
  console.log("selectedListIDs", selectedListIDs)
  // FIXME reuse ndk object from ndk.js
  const nip07signer = new NDKNip07Signer();
  ndk.signer = nip07signer
  await nip07signer.user().then(async (user) => {
    if (!!user.npub) {
      console.log("Permission granted to read their public key:", user.npub);
    }
  });
  const promises = selectedListIDs.map(async (listID) => {
    console.log(get(user))
    console.log("listId", listID)
    const event = new NDKEvent(ndk);
    const selectedList = getSelectedListFromID(get(user).lists, listID)
    console.log("selected List", selectedList)
    const listName = getListName(selectedList)
    console.log("listName", listName)
    const existingEvents = getListEvents(selectedList)
    console.log("existingEvents", existingEvents)
    console.log(resourceEventId)
    event.kind = 30001;
    event.content = "";
    if (index === null) {
      event.tags = [
        ["d", listID],
        ["name", listName],
        ...(existingEvents.length ? existingEvents : []),
        ["e", resourceEventId]
      ]
    } else {
      existingEvents.splice(index + 1, 0, ["e", resourceEventId]);
      console.log("inserted event in existing events", existingEvents)
      event.tags = [
        ["d", listID],
        ["name", listName],
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
