import { get } from 'svelte/store';
import { resultsPerPage } from '$lib/stores';
import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({
	host: 'http://127.0.0.1:7700',
	apiKey: 'MASTER_KEY'
});

// /** @type {import('./$types').PageLoad} */
// export async function load({ fetch }) {
// 	const res = await (
// 		await fetch('/api/elastic/search_all', {
// 			method: 'POST',
// 			body: JSON.stringify({ size: get(resultsPerPage) })
// 		})
// 	).json();
// 	return res;
// }

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	// Meilisearch is typo-tolerant:
	const index = client.index('nostr_notes');
	const res = await index.search('');
	console.log(res);
	return res;
}
