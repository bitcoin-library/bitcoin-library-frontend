import { get } from 'svelte/store';
import { resultsPerPage } from '$lib/stores';
import { index } from '$lib/meili/index';


/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await index.search('');
	// console.log(res);
	return res;
}
