
// import { NDKEvent } from "@nostr-dev-kit/ndk";
import { ndk } from "./ndk.js";
import { user } from "$lib/stores.js";
import { get } from "svelte/store";
// Import the package, NIP-07 signer and NDK event
import NDK, { NDKNip07Signer, NDKEvent } from "@nostr-dev-kit/ndk";
import { relays } from "$lib/nostr/ndk.js";

export const removeList = async (listEvent) => {
  // FIXME reuse ndk object from ndk.js
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
    ["e", listEvent]
  ]
  await event.sign(ndk.signer)
  await ndk.publish(event)
  console.log("removed list with list id", listEvent)
  // update lists
  user.updateLists(ndk, get(user).pk)
}
