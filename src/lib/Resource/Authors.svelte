<script>
	import bolt from 'svelte-awesome/icons/bolt';
	import { Icon } from 'svelte-awesome';
	import { zap } from '$lib/nostr/zap';

	export let authors;
	// TODO add sorting so most active authors are displayed first
</script>

<p>Authors:</p>
{#each authors as author}
	<div class="flex flex-row items-center justify-start">
		<div class="ml-2 basis-2/3">{author.name}</div>
		<div on:click={zap(author.npub)} class="btn-sm btn">
			Zap<Icon class="ml-2" data={bolt} />
		</div>
	</div>
{/each}
