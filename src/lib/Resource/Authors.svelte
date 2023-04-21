<script>
	import bolt from 'svelte-awesome/icons/bolt';
	import { Icon } from 'svelte-awesome';
	import { zap } from '$lib/nostr/zap';
	import { prop_dev } from 'svelte/internal';

	export let authors = [];
	export let title;
	// TODO add sorting so most active authors are displayed first

	$: longestArray =
		authors[0]?.addedByEvent &&
		authors.sort((a, b) => b.addedByEvent.length - a.addedByEvent.length)[0]
			.addedByEvent;
</script>

<p class="text-lg">{title}</p>
<div class="max-h-20 overflow-auto">
	{#each authors as author}
		<div class="mb-2 flex flex-row items-center justify-start p-2">
			<div class="ml-2 basis-2/3">
				{author.name} (Selected: {author.addedByEvent.length} / {longestArray.length})
			</div>

			<div on:click={zap(author.npub)} class="btn-sm btn">
				Zap<Icon class="ml-2" data={bolt} />
			</div>
		</div>
	{/each}
</div>
