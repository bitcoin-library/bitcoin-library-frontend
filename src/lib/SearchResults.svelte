<script>
	import { searchResults, totalHits } from '$lib/stores';
	import Card from "$lib/Card.svelte"
	let results;

	searchResults.subscribe((res) => {
		results = res;
	});
</script>

<p>Total Hits: {$totalHits}</p>
<div class="grid grid-cols-4 justify-center">
	{#if results.length}
		{#each results as result}
			<Card item={result._source} />
		{/each}
	{:else}
		<div>No Results</div>
	{/if}
</div>
