import { user } from "$lib/stores.js";
import { ndkStore } from "$lib/stores/ndk.js";
import { nip19, generatePrivateKey, getPublicKey } from 'nostr-tools'
import { get } from "svelte/store";

export const login = async () => {
  const ndk = get(ndkStore);
  if (typeof window.nostr !== 'undefined') {
    console.log('nostr is available!');
    const pk = await window.nostr.getPublicKey()
    user.setUser(ndk, pk)
  } else {
    alert(`window.nostr is not available. Please install a compatible 
    browser extension (e.g. Alby).`);
  }
}
