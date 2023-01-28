import { get } from 'svelte/store';
import { resultsPerPage } from '$lib/stores';


/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await (
		await fetch('/api/elastic/search_all', {
			method: 'POST',
			body: JSON.stringify({ size: get(resultsPerPage) })
		})
	).json();
	return res;
}
