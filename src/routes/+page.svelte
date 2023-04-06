<script>
	import SearchBar from '$lib/Search/SearchBar.svelte';
	import {
		searchResults,
		totalHits,
		openFilterbar,
		openSidebar,
		openDetailbar,
		selectedCard
	} from '../lib/stores';
	import SearchResults from '$lib/Search/SearchResults.svelte';
	import Pagination from '$lib/Pagination.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
	import Header from '$lib/Header.svelte';
	import Detailbar from '$lib/Detailbar.svelte';

	import Filterbar from '$lib/Search/Filterbar.svelte';
	import SearchSelector from '$lib/Search/SearchSelector.svelte';

	import SearchHeader from '$lib/Search/SearchHeader.svelte';

	export let data;

		// TODO remove later
	const fakeHits = []
	for (let i = 0; i < 100; i++) {
		fakeHits.push(data.hits[0])
	}

	searchResults.set(fakeHits);
	$totalHits = data.estimatedTotalHits;
	$: console.log($searchResults);
</script>

<Header />

<div class="drawer drawer-end">
	<input
		id="sidebar"
		type="checkbox"
		class="drawer-toggle"
		bind:checked={$openSidebar}
	/>
	<div class="drawer-content">
		<!-- Page content here -->
		<div class="mx-auto flex flex-row px-4">
			<div class="px-4 {$openDetailbar ? 'basis-3/4' : 'basis-full'}">
				<SearchResults />
			</div>
			{#if $openDetailbar}
				<div class="">
					
					<Detailbar item={$selectedCard} />
				</div>
			{/if}
		</div>
		<Pagination />
	</div>

	<Sidebar />
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
