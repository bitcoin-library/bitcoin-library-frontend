<script>
	import {
		searchTerm,
		searchResults,
		resultsPerPage,
		pagination,
		totalHits,
		filters
	} from '$lib/stores';
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
	let openFilter = false;
</script>

<div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		on:click={() => (openFilter = !openFilter)}
		class="flex flex-row justify-between border border-base-300 bg-base-200 rounded p-2 hover:bg-base-100"
	>
		<span>{property.name}</span>
		<button>></button>
	</div>
	{#if openFilter}
		<div class="flex flex-col absolute z-10 bg-base-200 border-base-300 rounded p-2 w-1/5">
			{#each property.attributes as attribute}
				<label class="label cursor-pointer justify-start hover:bg-violet-600">
					{#if !attribute.checked}
						<input
							type="checkbox"
							on:click={() => (attribute.checked = !attribute.checked)}
							checked
							class="checkbox checkbox-sm"
						/>
					{:else}
						<input
							type="checkbox"
							checked={attribute.checked}
							on:click={() => (attribute.checked = !attribute.checked)}
							on:click={handleClick}
							class="checkbox checkbox-sm"
							class:checkbox-warning={attribute.checked}
						/>
					{/if}

					<span class="label-text px-2">{attribute.value}</span>
				</label>
			{/each}
			<div>
				<button class="btn">Reset</button>
			</div>
		</div>
	{/if}
</div>
