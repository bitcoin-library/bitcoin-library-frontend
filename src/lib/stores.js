import { writable } from "svelte/store";

export const searchResults = writable([])
export const searchTerm = writable("")
export const pagination = writable({
  current: 1
})
export const resultsPerPage = writable(12)
export const totalHits = writable(0)


// Filter stuff
export const filters = writable([
  {
		name: 'Languages',
		term: "language.keyword",
		attributes: [
			{ id: 0, value: 'de_DE', label: 'de', checked: false },
			{ id: 1, value: 'en_EN', label: 'en', checked: false }
		]
	}
])

export const openSidebar = writable(false);
export const openDetailbar = writable(false);
export const selectedCard = writable({})