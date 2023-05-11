
// import { NDKEvent } from "@nostr-dev-kit/ndk";
import { ndk } from "./ndk.js";
import { user } from "$lib/stores.js";
import { get } from "svelte/store";
import { NDKNip07Signer, NDKEvent } from "@nostr-dev-kit/ndk";

// selected lists is array of list ids
export const addResourceToLists = async (selectedLists, resourceEventId) => {
  // FIXME reuse ndk object from ndk.js
  const nip07signer = new NDKNip07Signer();
  ndk.signer = nip07signer
  await nip07signer.user().then(async (user) => {
    if (!!user.npub) {
      console.log("Permission granted to read their public key:", user.npub);
    }
  });
  selectedLists.forEach(async (listID) => {
    console.log(get(user))
    const event = new NDKEvent(ndk);
    const listName = Array.from(get(user).lists)
      .find(l => l.id === listID)
      .tags
      .find(t => t[0] === "d")
    [1]
    const existingEvents = Array.from(get(user).lists)
      .find(l => l.id === listID)
      .tags
      .filter(t => t[0] !== "d")
    console.log("listName", listName)
    console.log("existingEvents", existingEvents)
    event.kind = 30001;
    event.content = "";
    event.tags = [
      ["d", listName],
      ...(existingEvents.length ? existingEvents : []),
      ["e", resourceEventId]
    ]
    console.log(event)
    await event.sign(ndk.signer)
    await ndk.publish(event)
    console.log("published list")
    // update lists
    user.updateLists(ndk, get(user).pk)
  });
}
