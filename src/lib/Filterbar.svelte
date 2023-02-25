<script>
	import Multiselect from '$lib/Filters/Multiselect.svelte';
	import { filters } from '$lib/stores';
	import CustomFilter from './Filters/CustomFilter.svelte';
</script>

<div class="grid grid-cols-4 gap-4">
	<!-- <Multiselect property={$filters.find((f) => f.name === 'Languages')} /> -->
	<CustomFilter property={$filters.find((f) => f.name === 'Languages')} />
	<CustomFilter property={$filters.find((f) => f.name === 'Category')} />
</div>
