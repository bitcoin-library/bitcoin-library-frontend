import { writable } from "svelte/store";
import keywords from "$lib/bots/keywords.json"

export const searchResults = writable([])
export const searchTerm = writable("")
export const pagination = writable({
  current: 1
})
export const resultsPerPage = writable(12)
export const totalHits = writable(0)

// sort keywords alphabetically by title attribute
const sortedKeywords = [...keywords].sort((a, b) => {
	if (a.title < b.title) {
		return -1
	}
	if (a.title > b.title) {
		return 1
	}
	return 0
})

const keywordsForFilter = sortedKeywords.map((k,index) => {
	return {
		id: index,
		value: k.title,
		label: k.title,
		checked: false
	}
})


const mockFilter = [
  {
		id: "languages",
		name: 'Languages',
		term: "language.keyword",
		attributes: [
			{ id: 0, value: 'de_DE', label: 'de', checked: false },
			{ id: 1, value: 'en_EN', label: 'en', checked: false }
		]
	},
	{
		id: "category",
		name: "Category",
		term: "",
		attributes: keywordsForFilter
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
					const attributes = filter.attributes.map(e => ({...e, checked: false}))
					return {...filter, attributes}
				}
				return filter
			})
		}),
		toggleFilter: (id, attribute) => update(f => {
			return f.map(filter => {
				if (filter.id === id) {
					const attributes = filter.attributes.map(a => 
						a.id === attribute.id
						? {...a, checked: !a.checked}
						: a
						)
					return {...filter, attributes}
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
})