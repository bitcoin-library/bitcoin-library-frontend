<script>
	import SearchBar from './SearchBar.svelte';
	import { openFilterbar } from '$lib/stores/search.js';
	import Filterbar from './Filterbar.svelte';
</script>

<div class="flex flex-col items-center gap-x-1 gap-y-2">
	<SearchBar />
	{#if $openFilterbar}
		<Filterbar />
	{/if}
</div>
