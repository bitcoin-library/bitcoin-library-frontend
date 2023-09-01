import { writable, derived, get } from "svelte/store";
import { listStore } from "$lib/stores/lists";
import { nip19, generatePrivateKey, getPublicKey } from 'nostr-tools'


export const openDetailbar = writable(false);

/** 
* Store for handling the selected card
* @property {string} eventID - event Id of the selected Card
*/
export const selectedCard = writable({})

// user
const defaultUser = {
  pk: "",
  npub: "",
  lists: get(listStore),
  showDetails: false,
  profile: {}
}

function createUser() {
  const { subscribe, set, update } = writable(defaultUser)

  return {
    subscribe,
    set,
    update,
    setUser: async (ndk, pk) => {
      const npub = nip19.npubEncode(pk)
      const nUser = ndk.getUser({ npub: npub })
      await nUser.fetchProfile()
      const lists = await listStore.getListsForUser(pk)
      update(u => ({ ...u, pk: pk, npub: npub, profile: nUser.profile, lists }))
    },
    setListsForUser: (lists) => {
      update(u => ({ ...u, lists }))
    },
    getListsForUser: async (pk) => {
      const lists = await listStore.getListsForUser(pk)
      update(u => ({ ...u, lists }))
    },
    updateLists: async (pk) => {
      const lists = await listStore.getListsForUser(pk)
      console.log("got these lists in updateLists", lists)
      update(u => ({ ...u, lists }))
    },
    reset: () => {
      set(defaultUser)
    }
  }
}

export const user = createUser()


//
// menu
//
const defaultMenu = {
  addResource: false,
  lists: false
}
function createMenu() {
  const { subscribe, set, update } = writable(defaultMenu)

  return {
    subscribe,
    set,
    update,
    reset: () => {
      set(defaultMenu)
    }
  }
}
export const activeMenu = createMenu()


/**
 * @param {string} id
 * @returns {object} user
 */
export async function getUser(pubkey) {
  const ndkUser = await ndk.getUser({ hexpubkey: pubkey });
  const user = getUserfromNdkEvent(ndkUser);
  return user
};

