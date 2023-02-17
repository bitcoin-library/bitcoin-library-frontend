import { PUBLIC_ES_INDEX } from '$env/static/public';

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
	const filterTerms = [];
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
			});
		}
	});
	let query;
	if (searchTerm === '' && !filterTerms.length) {
		query = {
			index: PUBLIC_ES_INDEX,
			query: {
				match_all: {}
			},
			size,
			from,
			track_total_hits: true
		};
	} else if (searchTerm === '' && filterTerms.length) {
		query = {
			index: PUBLIC_ES_INDEX,
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
			index: PUBLIC_ES_INDEX,
			query: {
				bool: {
					must: {
						multi_match: {
							query: searchTerm,
							type: 'bool_prefix',
							fields: ['name', 'name._2gram', 'name._3gram', 'description', 'full_text']
							// fields: ['name', 'description']
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
