<script>
	import { searchResults, totalHits, filters } from '$lib/stores/search.js';
	import Card from '$lib/Resource/Card.svelte';
	import SearchResultsHeader from './SearchResultsHeader.svelte';
	import Pagination from '$lib/Search/Pagination.svelte';
	let checked = [];

	$: checked = $filters
		.map((f) => f.attributes.filter((a) => a.checked))
		.flat();
</script>

<div>
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
		{#if $searchResults.length}
			{#each $searchResults as result}
				<Card item={result} />
			{/each}
		{:else}
			<div>No Results</div>
		{/if}
	</div>

	<Pagination />
</div>
