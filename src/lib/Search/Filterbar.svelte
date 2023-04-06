<script>
	import Multiselect from '$lib/Filters/Multiselect.svelte';
	import { filters } from '$lib/stores';
	import CustomFilter from '../Filters/CustomFilter.svelte';
</script>

<div class="flex mt-2">
	<!-- <Multiselect property={$filters.find((f) => f.name === 'Languages')} /> -->
	<CustomFilter property={$filters.find((f) => f.name === 'Languages')} />
	<CustomFilter property={$filters.find((f) => f.name === 'Category')} />
</div>
