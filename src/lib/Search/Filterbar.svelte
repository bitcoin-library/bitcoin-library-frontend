<script>
	import { filters } from '$lib/stores';
	import CustomFilter from '../Filters/CustomFilter.svelte';
</script>

<div class="flex flex-row gap-2">
	<!-- <CustomFilter property={$filters.find((f) => f.name === 'Languages')} /> -->
	<CustomFilter property={$filters.find((f) => f.id === 'keywords')} />
	<CustomFilter property={$filters.find((f) => f.id === 'resourceTypes')} />
</div>
