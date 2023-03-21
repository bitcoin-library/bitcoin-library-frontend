<script>
	import { searchResults, totalHits, filters } from '$lib/stores';
	import Card from '$lib/Card.svelte';
	import SearchResultsHeader from './SearchResultsHeader.svelte';
	let results;
	let checked = [];

	searchResults.subscribe((res) => {
		results = res;
	});

	$: checked = $filters.map((f) => f.attributes.filter((a) => a.checked)).flat();
</script>

<p class="mb-4">
	<span class="font-semibold">{$totalHits}</span> hits
	{#if checked.length}
		for <SearchResultsHeader bind:checked/>
	{/if}
</p>

<div class="flex flex-wrap justify-center gap-2">
	{#if results.length}
		{#each results as result}
			<Card item={result._source} />
		{/each}
	{:else}
		<div>No Results</div>
	{/if}
</div>
