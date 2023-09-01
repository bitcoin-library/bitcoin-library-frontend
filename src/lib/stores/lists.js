import { writable, get } from 'svelte/store';
import { ndkStore } from '$lib/stores/ndk.js';

export const allowListEdit = writable(false)

function createListStore() {
  const { subscribe, set, update } = writable([])

  return {
    subscribe,
    set,
    update,
    getListsForUser: async (pubkey) => {
      const listsForUser = await getListsForUser(pubkey)
      console.log("listsForUser", listsForUser)
      set(listsForUser)
      return sortLists(listsForUser)
    },
    toggleExpanded: async (listId) => {
      update(lists => {
        return lists.map(list => {
          return list.id !== listId ? list : { ...list, expanded: !list.expanded }
        })

      })
    }
  }
}

/**
 * @property {string} event
 * @property {string} eventId
 * @property {string} id
 */
export const listStore = createListStore()

const supportedKinds = [
  // 3, // contacts
  // 10000, // mute
  // 10001, // pin
  // 30000, // categorized people
  30001 // categorized bookmarks
];


const getListFromNdkEvent = (event) => {
  const list = {
    event: JSON.stringify(event.rawEvent()),
    eventId: event.id,
    id: listIdForListEvent(event),
    nip19: event.encode(),
    authorPubkey: event.pubkey,
    name: listNameForListEvent(event),
    content: event.content,
    createdAt: event.created_at,
    kind: event.kind,
    expanded: false,
    privateItems: [],
    publicItems: publicItemsForListEvent(event)
  }
  return list
};

async function getListsForUser(pubkey) {
  const ndk = get(ndkStore);

  const listsForUser = [];

  const listsFilter = {
    kinds: supportedKinds,
    authors: [pubkey]
  };

  const eventSet = await ndk.fetchEvents(listsFilter)
  eventSet.forEach((event) => {
    const list = getListFromNdkEvent(event);
    listsForUser.push(list);
  })
  return listsForUser
}


/**
 * Returns a list of NDKTags for the public items in a list.
 * @returns an array of NDKTag objects or undefined if there are no items
 */
const publicItemsForListEvent = (event) => {
  return event.tags.filter((tag) => tag[0] !== 'd');
}


/**
 * Return the name of the list based on kind and d-tag
 * @returns string
 */
const listNameForListEvent = (event) => {
  let listName = '';
  if (event.kind === 3) listName = 'following';
  if (event.kind === 10000) listName = 'mute';
  if (event.kind === 10001) listName = 'pin';
  if (event.kind === 30000 || event.kind === 30001) {
    listName = event.replaceableDTag();
  }
  return listName;
}

/**
 * Returns the listId for a list based on kind, author, and d-tag
 * @returns string
 */
const listIdForListEvent = (event) => {
  let id = '';
  if (event.kind === 3 || event.kind === 10000 || event.kind === 10001)
    id = `${event.kind}:${event.pubkey}`;
  if (event.kind === 30000 || event.kind === 30001) id = event.tagId();
  return id;
}

const sortLists = (list) => {
  list.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });
  return list
}

