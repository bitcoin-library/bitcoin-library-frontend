<script>
	import { filters } from '$lib/stores';

	export let checked;
</script>

{#each $filters as filter}
	{#each filter.attributes as attribute}
		{#if attribute.checked === true}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				on:click={() => filters.toggleFilter(filter.id, attribute)}
				class=" cursor-pointer badge badge-warning gap-2 mx-1"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block w-4 h-4 stroke-current"
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
	<span class="cursor-pointer ml-2 btn btn-xs" on:click={filters.resetAll}>Remove all filters</span>
{/if}
