<script>
	import { pagination, resultsPerPage, searchTerm, searchResults, totalHits } from '$lib/stores';

	let pages;

	async function handleClick(event) {
		const selectedPage = event.target.dataset.value;
		$pagination.current = selectedPage;

		const body = buildBody($searchTerm, $resultsPerPage, $pagination.current);
		const res = await fetch('/api/elastic/search', body);
		const result = await res.json();
		searchResults.set(result.hits.hits);
		$totalHits = result.hits.total.value;
	}

	$: pages = Array(Math.ceil($totalHits / $resultsPerPage));
</script>

<div class="flex justify-center m-3">
	<div class="btn-group">
		<!-- FIXME make me uncheckable -->
		<input
			type="radio"
			name="options"
			data-title="First"
			data-value="1"
			class="btn"
			on:click={handleClick}
		/>
		{#each pages as page, index}
			<input
				type="radio"
				name="options"
				data-title={index + 1}
				data-value={index + 1}
				class="btn"
				checked={$pagination.current == index + 1 ? true : false}
				on:click={handleClick}
			/>
		{/each}
		<!-- FIXME make me uncheckable -->
		<input
			type="radio"
			name="options"
			data-title="Last"
			data-value={pages.length}
			class="btn"
			on:click={handleClick}
		/>
	</div>
</div>
