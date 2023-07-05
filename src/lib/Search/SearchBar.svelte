<script>
	import {
		filters,
		openFilterbar,
		pagination,
		resultsPerPage,
		searchResults,
		searchTerm,
		totalHits
	} from '$lib/stores';
	import Icon from 'svelte-awesome';
	import { close, filter } from 'svelte-awesome/icons';
	import { handleSearch } from '$lib/meili/search';

	let itemSelected = { _source: { name: '' } };

	$: searchTerm.set(itemSelected?._source?.name);
</script>

<form on:submit|preventDefault={handleSearch} class="">
	<div class="form-control flex flex-row gap-2">
		<div class="input-group">
			<input
				type="text"
				placeholder="Search…"
				class="input-bordered input"
				bind:value={$searchTerm}
				on:change={handleSearch}
				on:input={handleSearch}
			/>
			<button class="btn-square btn" on:click={handleSearch}>
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
		<button on:click={() => ($openFilterbar = !$openFilterbar)} class="btn">
			<span>Filter</span>
			{#if $openFilterbar}
				<Icon class="swap-off pl-1" data={close} />
			{:else}
				<Icon class="swap-on pl-1" data={filter} />
			{/if}
		</button>
	</div>
</form>
