import { user } from "$lib/stores.js";
import { ndk } from "./ndk.js";
import { nip19, generatePrivateKey, getPublicKey } from 'nostr-tools'
import { get } from "svelte/store";

export const login = async () => {
  if (typeof window.nostr !== 'undefined') {
    console.log('nostr is available!');
    const pk = await window.nostr.getPublicKey()
    user.setUser(ndk, pk)
  } else {
    alert(`window.nostr is not available. Please install a compatible 
    browser extension (e.g. Alby).`);
  }
}
