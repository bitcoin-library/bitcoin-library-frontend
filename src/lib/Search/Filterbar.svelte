<script>
	import { filters } from '$lib/stores';
	import CustomFilter from '../Filters/CustomFilter.svelte';
</script>

<div class="flex mt-2">
	<CustomFilter property={$filters.find((f) => f.name === 'Languages')} />
	<CustomFilter property={$filters.find((f) => f.name === 'Category')} />
</div>
