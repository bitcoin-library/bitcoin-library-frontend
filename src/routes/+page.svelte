<script>
	import { selectedCard, user, searchResults } from '../lib/stores';
	import SearchResults from '$lib/Search/SearchResults.svelte';
	import Header from '$lib/Header.svelte';
	import Detailbar from '$lib/Detailbar.svelte';

	export let data;

	searchResults.set(data.res);

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
				<ul class="menu h-full w-1/3 bg-base-200 p-4 text-base-content">
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
