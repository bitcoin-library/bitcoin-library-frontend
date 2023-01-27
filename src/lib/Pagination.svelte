<script>
	import { pagination, resultsPerPage, searchTerm, searchResults, totalHits } from '$lib/stores';
    import { buildBody } from '$lib/elastic/helper';

	let pages;

    async function handleClick(event) {
        const selectedPage = event.target.dataset.title
        $pagination.current = selectedPage

        const body = buildBody($searchTerm, $resultsPerPage, $pagination.current)
        console.log(body)
        const res = await fetch('/api/elastic/search', body);
		const result = await res.json();
		console.log(result.hits.hits);
		searchResults.set(result.hits.hits);
        $totalHits = results.hits.total.value
    }

	$: pages = Array(Math.floor($totalHits / $resultsPerPage));
	$: console.log($pagination);
</script>

<div class="btn-group">
	{#each pages as page, index}
		<input
			type="radio"
			name="options"
			data-title={index + 1}
			class="btn"
			checked={$pagination.current == index + 1 ? true : false}
            on:click={handleClick}
		/>
	{/each}
</div>
