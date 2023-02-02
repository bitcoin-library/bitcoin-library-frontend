<script>
	import SearchBar from '$lib/SearchBar.svelte';
	import { searchResults, totalHits, filters } from '../lib/stores';
	import SearchResults from '$lib/SearchResults.svelte';
	import Pagination from '$lib/Pagination.svelte';
	import Multiselect from '$lib/Filters/Multiselect.svelte';

	export let data;
	searchResults.set(data.hits.hits)
	$totalHits = data.hits.total.value
</script>

<div class="flex justify-center p-2">
	<SearchBar />
</div>
<div class="container mx-auto px-4 flex flex-row">
	<div class="basis-1/4 border px-4">
		<Multiselect property={$filters.find(f => f.name === "Languages")} />
	</div>
	<div class="basis-3/4 border px-4">
		<SearchResults />
		<Pagination />
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
