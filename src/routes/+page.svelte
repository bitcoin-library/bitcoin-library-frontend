<script>
	import { selectedCard } from '$lib/stores/user.js';
	import {
		searchResults,
		totalHits,
		openFilterbar
	} from '$lib/stores/search.js';
	import SearchResults from '$lib/Search/SearchResults.svelte';
	import Header from '$lib/Header.svelte';
	import Detailbar from '$lib/Detailbar.svelte';
	import Filterbar from '$lib/Search/Filterbar.svelte';
	import { Icon } from 'svelte-awesome';
	import info from 'svelte-awesome/icons/info';

	// load data for first render
	export let data;
	searchResults.set(data.search.hits);
	totalHits.set(data.search.estimatedTotalHits);

	let checkedResourceDrawer;
	// der drawer öffnet sich, weil der wert wechselt, nicht weil auf true oder false getellt wird
	$: checkedResourceDrawer = $selectedCard.id || $openFilterbar;
</script>

<div>
	<div
		class="flex flex-row justify-center rounded border border-4 border-purple-500 p-2 text-center text-xl"
	>
		<span class="mx-auto">
			Bear with me, I'm still work in progress. Feel free <a
				class="underline"
				target="_blank"
				href="https://snort.social/p/npub1r30l8j4vmppvq8w23umcyvd3vct4zmfpfkn4c7h2h057rmlfcrmq9xt9ma"
				>to reach out</a
			>!
		</span>
		<a href="/about" class="btn btn-circle btn-outline btn-sm">
			<Icon data={info} />
		</a>
	</div>
	<Header />
	<SearchResults />
	<div class="flex flex-row">
		<div class="drawer drawer-end">
			<input
				checked={checkedResourceDrawer}
				id="resource-drawer"
				type="checkbox"
				class="drawer-toggle"
			/>
			<div id="drawer" class="drawer-side">
				<label for="resource-drawer" class="drawer-overlay" />
				<ul
					class="menu min-h-full w-full bg-base-200 p-4 text-base-content sm:w-1/2 md:w-1/3"
				>
					{#if $selectedCard.id}
						<!-- Sidebar content here -->
						<Detailbar item={$selectedCard} />
					{:else if $openFilterbar}
						<Filterbar />
					{/if}
				</ul>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	:global(html) {
	}
</style>
