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
	const filterTerms = []
	filters?.map((f) => {
		// if all attributes are unchecked we add no filter term
		if (!f.attributes.every((attr) => attr.checked === false)) {
				const terms = [];
				f.attributes
					.filter((attr) => attr.checked)
					.forEach((attr) => {
						const term = {
							term: {
								[`${f.term}`]: `${attr.value}`
							}
						};
						terms.push(term);
					});
					filterTerms.push({
						bool: {
							should: [...terms]
						}
					})
			}
		});
	let query;
	if (searchTerm === '' && !filterTerms.length) {
		query = {
			index: 'mongo-data',
			query: {
				match_all: {}
			},
			size,
			from,
			track_total_hits: true
		};
	} else if (searchTerm === '' && filterTerms.length) {
		query = {
			index: 'mongo-data',
			query: {
				bool: {
					filter: [...filterTerms]
				}
			},
			size,
			from,
			track_total_hits: true
		};
	} else {
		query = {
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
					filter: [...filterTerms]
				}
			},
			size,
			from,
			track_total_hits: true
		};
	}
	return query;
};
