<script>
	import { searchResults, totalHits } from '$lib/stores';
	import Card from "$lib/Card.svelte"
	import SearchResultsHeader from './SearchResultsHeader.svelte';
	let results;

	searchResults.subscribe((res) => {
		results = res;
	});
</script>

<p>Total Hits: {$totalHits}</p>
<SearchResultsHeader />
<div class="grid grid-cols-results justify-center items-start">
	{#if results.length}
		{#each results as result}
			<Card item={result._source} />
		{/each}
	{:else}
		<div>No Results</div>
	{/if}
</div>
