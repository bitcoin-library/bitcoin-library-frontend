<script>
	import { searchTerm, searchResults, resultsPerPage, pagination, totalHits, filters } from '$lib/stores';
	import { buildBody } from '$lib/elastic/helper';

	export let property;

	async function handleClick() {
		const body = buildBody($searchTerm, $resultsPerPage, $pagination.current, $filters);
		const res = await fetch('/api/elastic/search', body);
		const result = await res.json();
		console.log(result);
		result?.hits && searchResults.set(result.hits.hits);
		$totalHits = result.hits.total.value;
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
	<input type="checkbox" />
	<div class="collapse-title font-medium">{property.name}</div>
	<div class="collapse-content">
		{#each property.attributes as attribute}
			<label class="label cursor-pointer justify-start">
				<input
					type="checkbox"
					checked={attribute.checked}
					on:click={() => (attribute.checked = !attribute.checked)}
					on:click={handleClick}
					class="checkbox checkbox-sm"
				/>
				<span class="label-text px-2">{attribute.value}</span>
			</label>
		{/each}
	</div>
</div>
