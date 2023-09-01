<script>
	import { openFilterbar, searchTerm } from '$lib/stores/search.js';
	import Icon from 'svelte-awesome';
	import { close, filter } from 'svelte-awesome/icons';
	import { submitSearch } from '$lib/meili/submitSearch.js';
</script>

<form on:submit|preventDefault={submitSearch} class="">
	<div class="form-control flex flex-col gap-2 sm:flex-row">
		<div class="input-group">
			<input
				type="text"
				placeholder="Search…"
				class="input input-bordered"
				bind:value={$searchTerm}
				on:change={submitSearch}
				on:input={submitSearch}
			/>
			<button class="btn btn-square" on:click={submitSearch}>
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
