
import { ndkStore } from "$lib/stores/ndk.js";
import { user } from "$lib/stores.js";
import { get } from "svelte/store";
import { listStore } from "$lib/stores/lists";
// Import the package, NIP-07 signer and NDK event
import NDK, { NDKNip07Signer, NDKEvent } from "@nostr-dev-kit/ndk";

export const removeList = async (list) => {
  console.log(list)
  const ndk = get(ndkStore)
  const nip07signer = new NDKNip07Signer();
  ndk.signer = nip07signer
  await nip07signer.user().then(async (user) => {
    if (!!user.npub) {
      console.log("Permission granted to read their public key:", user.npub);
    }
  });
  const event = new NDKEvent(ndk);
  event.kind = 5;
  event.content = "remove list";
  event.tags = [
    ["e", list.eventId],
    ["a", list.id]
  ]
  await event.sign(ndk.signer)
  await event.publish()
  console.log("removed list with list with name: ", list.name)
  // // update lists
  // await user.updateLists(ndk, get(user).pk)
  await listStore.getListsForUser(get(user).pk)
}
