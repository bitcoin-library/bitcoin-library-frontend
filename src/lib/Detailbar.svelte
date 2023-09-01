<script>
	import { openDetailbar, selectedCard } from '$lib/stores/user.js';
	import Authors from '$lib/Resource/Authors.svelte';
	import Tags from './Resource/Tags.svelte';
	import XMark from './elements/icons/XMark.svelte';

	export let item;
</script>

{#if Object.keys($selectedCard).length}
	<div class="">
		<div class="flex">
			<button
				class="btn btn-circle mb-4 ml-auto"
				on:click={() => {
					selectedCard.set({});
				}}
			>
				<XMark />
			</button>
		</div>

		<img class="object-contain" src={item.image} alt="" />

		<div class="mb-3 mt-3 block">
			<a href={item.uri} target="_blank" rel="noreferrer" class="btn">Open</a>
			<button class="btn">Copy Link</button>
		</div>

		<Tags properties={item.keywords} />

		<div class="mt-3">
			<Tags properties={item.resourceType} />
		</div>

		<h1 class="mt-3 text-xl font-bold">{item.name}</h1>

		<p class="mb-5 mt-5">{item.description}</p>

		<Authors
			authors={item.authors &&
				item.authors.filter((author) => author.name !== '')}
			title="Authors:"
		/>

		<Authors
			authors={item.metadataContributors &&
				item.metadataContributors.filter((author) => author.name !== '')}
			title="Contributors:"
		/>
	</div>
{/if}
