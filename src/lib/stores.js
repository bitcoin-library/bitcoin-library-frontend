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
	},
	{
		name: "Category",
		term: "",
		attributes: [
			{id: 0, value: "Common Questions", label: "Common Questions", checked: false},
			{id: 1, value: "Common Mistakes", label: "Common Mistakes", checked: false},
			{id: 2, value: "Wallets", label: "Wallets", checked: false},
			{id: 3, value: "Nodes", label: "Nodes", checked: false},
			{id: 4, value: "Lightning", label: "Coinjoin", checked: false},
			{id: 5, value: "Myths", label: "Myths", checked: false},
			{id: 6, value: "Glossary", label: "Glossary", checked: false},
			{id: 7, value: "Energy", label: "Energy", checked: false},

		]
	}
])

export const openSidebar = writable(false);
export const openDetailbar = writable(false);
export const openFilterbar = writable(false);
export const selectedCard = writable({})