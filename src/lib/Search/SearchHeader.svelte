<script>
	import SearchBar from './SearchBar.svelte';
	import { openFilterbar } from '$lib/stores';
	import Filterbar from './Filterbar.svelte';
</script>

<div class="flex flex-col items-center gap-y-2">
	<SearchBar />
	{#if $openFilterbar}
		<Filterbar />
	{/if}
</div>

