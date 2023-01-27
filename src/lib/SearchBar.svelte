<script>
	import { searchTerm, searchResults, resultsPerPage, pagination, totalHits } from '$lib/stores';
	import { buildBody } from "$lib/elastic/helper"

	async function handleSearch() {
		const body = buildBody($searchTerm, $resultsPerPage, $pagination.current);
		const res = await fetch('/api/elastic/search', body);
		const result = await res.json();
		console.log(result);
		searchResults.set(result.hits.hits);
		$totalHits = result.hits.total.value
	}
	$: console.log($searchTerm);
</script>

<div class="form-control">
	<div class="input-group">
		<form on:submit|preventDefault={handleSearch}>
			<input
				type="text"
				placeholder="Search…"
				class="input input-bordered"
				bind:value={$searchTerm}
			/>
			<button class="btn btn-square" on:click={handleSearch}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/></svg
				>
			</button>
		</form>
	</div>
</div>
