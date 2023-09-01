<script>
	import { filters } from '$lib/stores/search.js';
	import CustomFilter from './CustomFilter.svelte';
</script>

<div class="flex flex-col gap-2 sm:flex-row">
	<!-- <CustomFilter property={$filters.find((f) => f.name === 'Languages')} /> -->
	<CustomFilter property={$filters.find((f) => f.id === 'keywords')} />
	<CustomFilter property={$filters.find((f) => f.id === 'resourceTypes')} />
</div>
