<script>
	import { selectedCard } from '$lib/stores/user.js';
	import { searchResults, totalHits } from '$lib/stores/search.js';
	import SearchResults from '$lib/Search/SearchResults.svelte';
	import Header from '$lib/Header.svelte';
	import Detailbar from '$lib/Detailbar.svelte';

	// load data for first render
	export let data;
	searchResults.set(data.search.hits);
	totalHits.set(data.search.estimatedTotalHits);

	$: console.log($selectedCard);
</script>

<div>
	<Header />
	<div class="flex flex-row">
		<div class="drawer drawer-end">
			<input
				checked={$selectedCard.id}
				id="my-drawer"
				type="checkbox"
				class="drawer-toggle"
			/>
			<div class="drawer-content">
				<!-- Page content here -->
				<SearchResults />
			</div>
			<div class="drawer-side">
				<label for="my-drawer" class="drawer-overlay" />
				<ul
					class="menu h-full w-full bg-base-200 p-4 text-base-content sm:w-1/3"
				>
					<!-- Sidebar content here -->
					<Detailbar item={$selectedCard} />
				</ul>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	:global(html) {
	}
</style>
