import { writable, derived } from "svelte/store";
import keywords from "$lib/bots/keywords.json"
import resourceTypes from "$lib/bots/resourceTypes.json"
import { nip19, generatePrivateKey, getPublicKey } from 'nostr-tools'

export const searchResults = writable([])
export const searchTerm = writable("")
export const pagination = writable({
  current: 1
})
export const resultsPerPage = writable(12)
export const totalHits = derived(searchResults, $searchResults => $searchResults.length)

const botsToFilters = (bots) => {
  const sortedBots = [...bots].sort((a, b) => {
    if (a.title < b.title) {
      return -1
    }
    if (a.title > b.title) {
      return 1
    }
    return 0
  })

  const botsAsFilters = sortedBots.map((k, index) => {
    return {
      id: k.id,
      value: k.title,
      label: k.title,
      checked: false,
      uri: k.id
    }
  })
  return botsAsFilters
}


const mockFilter = [
  {
    id: "languages",
    name: 'Languages',
    attributes: [
      { id: 0, value: 'de_DE', label: 'de', checked: false },
      { id: 1, value: 'en_EN', label: 'en', checked: false }
    ]
  },
  {
    id: "keywords",
    name: "Keywords",
    attributes: botsToFilters(keywords)
  },
  {
    id: "resourceTypes",
    name: "Resource Types",
    attributes: botsToFilters(resourceTypes)
  }
]

function createFilters() {
  const { subscribe, set, update } = writable(mockFilter)

  return {
    subscribe,
    set,
    update,
    resetAll: () => set(mockFilter),
    reset: (id) => update(f => {
      return f.map(filter => {
        if (filter.id === id) {
          const attributes = filter.attributes.map(e => ({ ...e, checked: false }))
          return { ...filter, attributes }
        }
        return filter
      })
    }),
    toggleFilter: (id, attribute) => update(f => {
      return f.map(filter => {
        if (filter.id === id) {
          const attributes = filter.attributes.map(a =>
            a.id === attribute.id
              ? { ...a, checked: !a.checked }
              : a
          )
          return { ...filter, attributes }
        }
        return filter
      })
    })
  }
}


// Filter stuff
export const filters = createFilters()

export const openDetailbar = writable(false);
export const openFilterbar = writable(false);
export const selectedCard = writable({
  keywords: [],
  authors: [],
  metadataContributors: []
})


// user

const defaultUser = {
  pk: "",
  npub: "",
  lists: [],
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
      const filter = { kinds: [30001], authors: [pk] };
      const lists = await ndk.fetchEvents(filter);
      update(u => ({ ...u, pk: pk, npub: npub, profile: nUser.profile, lists: [...lists] }))
    },
    updateLists: async (ndk, pk) => {
      const filter = { kinds: [30001], authors: [pk] };
      const lists = await ndk.fetchEvents(filter);
      update(u => ({ ...u, lists: [...lists] }))
    },
    reset: () => {
      openDetailbar.set(false)
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
