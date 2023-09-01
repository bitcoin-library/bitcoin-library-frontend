<script>
	import { submitSearch } from '$lib/meili/submitSearch';
	import { pagination, totalHits } from '$lib/stores/search.js';

	let pages;

	function handleClick(event) {
		const selectedPage = event.target.dataset.value;
		pagination.update((p) => ({ ...p, current: selectedPage }));
		submitSearch();
	}
	$: pages = Array(Math.ceil($totalHits / $pagination.resultsPerPage));
</script>

<div class="m-3 flex justify-center">
	<div class="join">
		<button
			data-title="First"
			data-value="1"
			class="btn join-item"
			on:click={handleClick}>First</button
		>
		{#each pages as _, index}
			<button
				data-title={index + 1}
				data-value={index + 1}
				class="btn join-item"
				class:btn-active={$pagination.current == index + 1 ? true : false}
				class:text-black={$pagination.current == index + 1 ? true : false}
				class:bg-orange-500={$pagination.current == index + 1 ? true : false}
				on:click={handleClick}>{index + 1}</button
			>
		{/each}
		<button
			data-title="Last"
			data-value={pages.length}
			class="btn join-item"
			on:click={handleClick}>Last</button
		>
	</div>
</div>
