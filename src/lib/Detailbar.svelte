<script>
	import { openDetailbar, selectedCard } from '$lib/stores';
	import Authors from '$lib/Resource/Authors.svelte';
	import Tags from './Resource/Tags.svelte';

	export let item;
</script>

{#if Object.keys($selectedCard).length}
	<div class="no-scrollbar sticky top-0 mx-4 mb-4 h-screen overflow-auto">
		<div class="flex">
			<button
				class="btn-circle btn ml-auto mb-4"
				on:click={() => {
					selectedCard.set({});
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/></svg
				>
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

		<p class="mt-5 mb-5">{item.description}</p>

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
