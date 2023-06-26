

// import { NDKEvent } from "@nostr-dev-kit/ndk";
import { ndk } from "./ndk.js";
import { user } from "$lib/stores.js";
import { get } from "svelte/store";
import { NDKNip07Signer, NDKEvent } from "@nostr-dev-kit/ndk";

// selected lists is array of list ids
export const publishNoteEvent = async (content) => {
  // FIXME reuse ndk object from ndk.js
  const nip07signer = new NDKNip07Signer();
  ndk.signer = nip07signer
  await nip07signer.user().then(async (user) => {
    if (!!user.npub) {
      console.log("Permission granted to read their public key:", user.npub);
    }
  });
  const event = new NDKEvent(ndk)
  event.kind = 1;
  event.content = content;
  console.log(event)
  await event.sign(ndk.signer)
  await ndk.publish(event)
  console.log("published event")

  return event
  // update lists
  // user.updateLists(ndk, get(user).pk)
}
