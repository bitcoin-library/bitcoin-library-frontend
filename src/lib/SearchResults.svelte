<script>
	import { searchResults, totalHits } from '$lib/stores';
	let results;

	searchResults.subscribe((res) => {
		results = res;
	});
</script>

<div>
	{#if results.length}
		{#each results as result}
			<div>{result._source.title}</div>
		{/each}
	{:else}
		<div>No Results</div>
	{/if}

	<p>Total Hits: {$totalHits}</p>
</div>
