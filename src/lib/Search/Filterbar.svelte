<script>
	import { filters } from '$lib/stores/search.js';
	import CustomFilter from './CustomFilter.svelte';
	import XMark from '$lib/elements/icons/XMark.svelte';
	import { openFilterbar } from '$lib/stores/search.js';
</script>

<div class="flex w-full flex-col sm:gap-2">
	<button
		class="btn btn-circle mb-4 ml-auto"
		on:click={() => ($openFilterbar = false)}
	>
		<XMark />
	</button>
	<!-- <CustomFilter property={$filters.find((f) => f.name === 'Languages')} /> -->
	<CustomFilter property={$filters.find((f) => f.id === 'keywords')} />
	<CustomFilter property={$filters.find((f) => f.id === 'resourceTypes')} />
</div>
