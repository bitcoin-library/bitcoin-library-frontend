<script>
	import SearchBar from '$lib/SearchBar.svelte';
	import {
		searchResults,
		totalHits,
		openFilterbar,
		openSidebar,
		openDetailbar,
		selectedCard
	} from '../lib/stores';
	import SearchResults from '$lib/SearchResults.svelte';
	import Pagination from '$lib/Pagination.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
	import Header from '$lib/Header.svelte';
	import Detailbar from '$lib/Detailbar.svelte';

	import Filterbar from '$lib/Filterbar.svelte';
	import SearchSelector from '$lib/SearchSelector.svelte';

	export let data;
	searchResults.set(data.hits.hits);
	$totalHits = data.hits.total.value;
	$: console.log($selectedCard);
</script>

<Header />

<div class="drawer drawer-end">
	<input id="sidebar" type="checkbox" class="drawer-toggle" bind:checked={$openSidebar} />
	<div class="drawer-content">
		<!-- Page content here -->

		<div class="flex flex-col items-center">
			<SearchSelector />
			<SearchBar />
			{#if $openFilterbar}
				<Filterbar />
			{/if}
		</div>
		<div class="mx-auto px-4 flex flex-row">
			<div class="px-4 {$openDetailbar ? 'basis-3/4' : 'basis-full'}">
				<SearchResults />
			</div>
				{#if $openDetailbar}
					<div class="">
						<button
							class="btn"
							on:click={() => selectedCard.set({})}
							on:click={() => ($openDetailbar = false)}>Close</button
						>
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
