<script>
	import { filters } from '$lib/stores';
	import CustomFilter from '../Filters/CustomFilter.svelte';
</script>

<div class="mt-2 flex">
	<!-- <CustomFilter property={$filters.find((f) => f.name === 'Languages')} /> -->
	<CustomFilter property={$filters.find((f) => f.id === 'keywords')} />
	<CustomFilter property={$filters.find((f) => f.id === 'resourceTypes')} />
</div>
