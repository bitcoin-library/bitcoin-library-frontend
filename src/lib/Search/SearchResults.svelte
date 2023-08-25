<script>
	import { searchResults, totalHits, filters } from '$lib/stores';
	import Card from '$lib/Resource/Card.svelte';
	import SearchResultsHeader from './SearchResultsHeader.svelte';
	import Pagination from '$lib/Pagination.svelte';
	let results;
	let checked = [];

	searchResults.subscribe((res) => {
		results = res;
	});

	$: checked = $filters
		.map((f) => f.attributes.filter((a) => a.checked))
		.flat();
</script>

<div class="no-scrollbar h-screen overflow-auto">
	<div class="flex flex-row items-center">
		<p class="ml-6 mr-2">
			<span class="font-semibold">{$totalHits}</span>
			hits
		</p>
		{#if checked.length}
			<span class="mr-2">for </span>
			<SearchResultsHeader bind:checked />
		{/if}
	</div>

	<div class="flex flex-wrap justify-center gap-2">
		{#if results.length}
			{#each results as result}
				<Card item={result} />
			{/each}
		{:else}
			<div>No Results</div>
		{/if}
	</div>

	<!-- <Pagination /> -->
</div>
