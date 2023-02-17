<script>
	import SearchBar from '$lib/SearchBar.svelte';
	import {
		searchResults,
		totalHits,
		filters,
		openSidebar,
		openDetailbar,
		selectedCard
	} from '../lib/stores';
	import SearchResults from '$lib/SearchResults.svelte';
	import Pagination from '$lib/Pagination.svelte';
	import Multiselect from '$lib/Filters/Multiselect.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
	import Header from '$lib/Header.svelte';

	import { fade, fly } from 'svelte/transition';

	export let data;
	searchResults.set(data.hits.hits);
	$totalHits = data.hits.total.value;
	$: console.log($selectedCard)
</script>

<Header />

<div class="drawer drawer-end">
	<input id="sidebar" type="checkbox" class="drawer-toggle" bind:checked={$openSidebar} />
	<div class="drawer-content">
		<!-- Page content here -->

		<div class="flex justify-center p-2">
			<SearchBar />
		</div>
		<div class="mx-auto px-4 flex flex-row">
			<div class="basis-1/4 border px-4">
				<Multiselect property={$filters.find((f) => f.name === 'Languages')} />
			</div>
			<div class="px-4 {$openDetailbar ? 'basis-2/4' : 'basis-3/4'}">
				<SearchResults />
				<Pagination />
			</div>
			{#if $openDetailbar}
				<div class="basis-1/4">
					<button class="btn" 
						on:click={() => selectedCard.set({})}
						on:click={() => ($openDetailbar = false)}
						>Close</button>
					<p>Detailbar</p>
				</div>
			{/if}
		</div>
	</div>

	<Sidebar />
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
