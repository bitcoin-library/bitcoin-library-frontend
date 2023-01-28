export const buildBody = (searchTerm, resultsPerPage, currentPage) => {
	const body = {
		method: 'POST',
		body: JSON.stringify({
			searchTerm: searchTerm,
			size: resultsPerPage,
			from: (currentPage - 1) * resultsPerPage
		}),
		headers: {
			'content-type': 'application/json'
		}
	};
	return body;
};

export const buildSearch = (searchTerm, size, from) => {
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
				multi_match: {
					query: searchTerm,
					fields: ['title', 'description', 'full_text']
					// fields: ['title', 'description']
				}
			},
			size,
			from,
			track_total_hits: true
		};
	}
};
