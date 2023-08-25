
import { ndkStore } from "$lib/stores/ndk.js";
import { user } from "$lib/stores.js";
import { get } from "svelte/store";
// Import the package, NIP-07 signer and NDK event
import NDK, { NDKNip07Signer, NDKEvent } from "@nostr-dev-kit/ndk";

/**
 *
 */

export const removeItemFromList = async (list, resource) => {
  const ndk = get(ndkStore)
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
  const tags = list.tags.filter((t) => t[1] !== resource.eventID)

  event.tags = tags
  await event.sign(ndk.signer)
  await ndk.publish(event)
  // // update lists
  await user.updateLists(ndk, get(user).pk)
}
