<script>
	import { openDetailbar, selectedCard, user } from '../lib/stores';
	import SearchResults from '$lib/Search/SearchResults.svelte';
	import Header from '$lib/Header.svelte';
	import Detailbar from '$lib/Detailbar.svelte';
	import UserDetailbar from '$lib/User/UserDetailbar.svelte';
</script>

<div>
	<Header />
	<div class="flex">
		<div class={$openDetailbar ? 'basis-2/3' : 'basis-full'}>
			<SearchResults />
		</div>
		{#if $openDetailbar}
			<div class="basis-1/3">
				{#if $user.showDetails}
					<UserDetailbar />
				{:else}
					<Detailbar item={$selectedCard} />
				{/if}
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	:global(html) {
	}
</style>
