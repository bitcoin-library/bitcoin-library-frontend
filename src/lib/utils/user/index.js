import { ndkStore } from "$lib/stores/ndk.js"
import { get } from "svelte/store";

const ndk = get(ndkStore)

export function getUserfromNdkEvent(userParams) {
  try {
    const user = {
      pubkey: userParams.pubkey,
      npub: userParams.npub,
      name: userParams.name,
      displayName: userParams.displayName,
      image: userParams.image,
      banner: userParams.banner,
      bio: userParams.bio,
      nip05: userParams.nip05,
      lud16: userParams.lud16,
      about: userParams.about,
      zapService: userParams.zapService,
      lastFetched: userParams.lastFetched,
      relayUrls: userParams.relayUrls,
    };
    return user;
  } catch (error) {
    console.log(error);
  }
}

/**
 * @param {string} id
 * @returns {object} user
 */
export async function getUser(pubkey) {
  const ndkUser = await ndk.getUser({ hexpubkey: pubkey });
  const user = getUserfromNdkEvent(ndkUser);
  return user
};

