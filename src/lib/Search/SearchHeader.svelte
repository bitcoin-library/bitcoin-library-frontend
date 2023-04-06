<script>
  import SearchSelector from '$lib/Search/SearchSelector.svelte';
  import SearchBar from './SearchBar.svelte';
  import { openFilterbar } from '$lib/stores';
  import Filterbar from './Filterbar.svelte';
</script>


<div class="flex flex-col items-center">
  <SearchSelector />
  <SearchBar />
  {#if $openFilterbar}
    <Filterbar />
  {/if}
</div>