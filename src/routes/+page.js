import { get } from 'svelte/store';
import { resultsPerPage } from '$lib/stores';
import { index } from '$lib/meili/index';
import { handleSearch } from '$lib/meili/search';


/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  await handleSearch();
}
