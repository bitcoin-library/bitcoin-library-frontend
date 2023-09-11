<script>
	import bolt from 'svelte-awesome/icons/bolt';
	import { Icon } from 'svelte-awesome';
	import { zap } from '$lib/nostr/zap';

	export let metadataContributors;

	// TODO add sorting so most active authors are displayed first
</script>

<p>Metadata Contributors:</p>
{#each metadataContributors as contributor}
	<div class="flex flex-row items-center justify-start">
		<div class="ml-2 basis-2/3">{contributor.name}</div>
		<div on:click={zap(contributor.npub)} class="btn btn-sm">
			Zap<Icon class="ml-2" data={bolt} />
		</div>
	</div>
{/each}
