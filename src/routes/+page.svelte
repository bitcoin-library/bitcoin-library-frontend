<script>
	import { openDetailbar, selectedCard } from '../lib/stores';
	import SearchResults from '$lib/Search/SearchResults.svelte';
	import Header from '$lib/Header.svelte';
	import Detailbar from '$lib/Detailbar.svelte';
</script>

<div class="">
	<Header />
	<div class="flex">
		<div class={$openDetailbar ? 'basis-2/3' : 'basis-full'}>
			<SearchResults />
		</div>
		{#if $openDetailbar}
			<div class="basis-1/3">
				<Detailbar item={$selectedCard} />
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	:global(html) {
	}
</style>
