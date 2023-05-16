
import { ndk } from "./ndk.js";
import { user } from "$lib/stores.js";
import { get } from "svelte/store";
// Import the package, NIP-07 signer and NDK event
import NDK, { NDKNip07Signer, NDKEvent } from "@nostr-dev-kit/ndk";

/**
 *
 */

export const removeItemFromList = async (list, index) => {
  console.log(list, index)
  const nip07signer = new NDKNip07Signer();
  ndk.signer = nip07signer
  await nip07signer.user().then(async (user) => {
    if (!!user.npub) {
      console.log("Permission granted to read their public key:", user.npub);
    }
  });
  const event = new NDKEvent(ndk);
  event.kind = 30001;
  event.content = "remove item from list";

  // filter event from tags array 
  const tags = list.tags.filter((_, lIndex) => lIndex !== index)
  console.log("filtered tags", tags)

  event.tags = tags
  await event.sign(ndk.signer)
  await ndk.publish(event)
  console.log("removed list item from list")
  // // update lists
  await user.updateLists(ndk, get(user).pk)
}
