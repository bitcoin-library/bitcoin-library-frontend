import { ndkStore } from "$lib/stores/ndk.js";
import { listStore } from "$lib/stores/lists";
import { user } from "$lib/stores.js";
import { get } from "svelte/store";
import { NDKNip07Signer, NDKEvent } from "@nostr-dev-kit/ndk";

export const addList = async (listName) => {
  const ndk = get(ndkStore);
  const nip07signer = new NDKNip07Signer();
  ndk.signer = nip07signer
  await nip07signer.user().then(async (user) => {
    if (!!user.npub) {
      console.log("Permission granted to read their public key:", user.npub);
    }
  });
  const event = new NDKEvent(ndk);
  event.kind = 30001;
  event.content = "";
  event.tags = [
    ["d", listName],
  ]
  await event.sign(ndk.signer)
  await event.publish()
  console.log("published list")
  // update lists
  listStore.getListsForUser(get(user).pk)
}
