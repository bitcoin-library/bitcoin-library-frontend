export const buildBody = (searchTerm, resultsPerPage, currentPage, filters) => {
	const body = {
		method: 'POST',
		body: JSON.stringify({
			searchTerm: searchTerm,
			size: resultsPerPage,
			from: (currentPage - 1) * resultsPerPage,
			filters: filters
		}),
		headers: {
			'content-type': 'application/json'
		}
	};
	return body;
};

export const buildSearch = (searchTerm, size, from, filters) => {
	const terms = []
	filters && filters.map(f => {
		// if all attributes are unchecked we add no filter term
		if (!f.attributes.every(attr => attr.checked === false)) {
			f.attributes.filter(attr => attr.checked).forEach(attr => {
				const term = {
					"term": {
						[`${f.term}`]: `${attr.value}`
					}
				}
				terms.push(term)
			})
		} 
	})
	if (searchTerm === '') {
		return {
			index: 'mongo-data',
			query: {
				match_all: {}
			},
			size,
			from,
			track_total_hits: true
		};
	} else {
		return {
			index: 'mongo-data',
			query: {
				bool: {
					must: {
						multi_match: {
							query: searchTerm,
							fields: ['title', 'description', 'full_text']
							// fields: ['title', 'description']
						}
					},
					filter: [
						...terms
					]
				}
			},
			size,
			from,
			track_total_hits: true
		};
	}
};
