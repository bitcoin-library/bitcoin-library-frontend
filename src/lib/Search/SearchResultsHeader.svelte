<script>
	import { filters } from '$lib/stores/search.js';
	import { submitSearch } from '$lib/meili/submitSearch.js';
	export let checked;
</script>

<div class="flex flex-row items-center">
	{#each $filters as filter}
		{#each filter.attributes as attribute}
			{#if attribute.checked === true}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					on:click={() => {
						filters.toggleFilter(filter.id, attribute);
						submitSearch();
					}}
					class="badge badge-warning mx-1 cursor-pointer gap-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block h-4 w-4 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/></svg
					>
					{attribute.label}
				</div>
			{/if}
		{/each}
	{/each}

	{#if checked && checked.length}
		<button
			class="btn btn-xs ml-2 cursor-pointer"
			on:click={() => {
				filters.resetAll();
				submitSearch();
			}}>Remove all filters</button
		>
	{/if}
</div>
