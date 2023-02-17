<script>
	import { searchTerm, searchResults, resultsPerPage, pagination, totalHits, filters } from '$lib/stores';
	import { buildBody } from '$lib/elastic/helper';

	let itemSelected = {_source: {name: ""}}

	async function handleSearch() {
		const body = buildBody($searchTerm, $resultsPerPage, $pagination.current, $filters);
		const res = await fetch('/api/elastic/search', body);
		const result = await res.json();
		result?.hits && searchResults.set(result.hits.hits);
		$totalHits = result.hits.total.value;
	}
	$: searchTerm.set(itemSelected?._source?.name)
</script>

<form on:submit|preventDefault={handleSearch} class="w-1/3">
	<div class="form-control">	
		<div class="input-group">
			<input
				type="text"
				placeholder="Search…"
				class="input input-bordered w-full"
				bind:value={$searchTerm}
				on:change={handleSearch}
				on:input={handleSearch}
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
		</div>
	</div>
</form>
