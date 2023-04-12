<script>
	import { openDetailbar, selectedCard } from '$lib/stores';
	import Tags from './Resource/Tags.svelte';

	export let item = {
		keywords: []
	};

	$: console.log(item);
</script>

<div class="sticky top-0 mr-4 mb-4 h-screen overflow-auto no-scrollbar">
	<div class="flex">
		<button
			class="btn-circle btn ml-auto mb-4"
			on:click={() =>
				selectedCard.set({
					keywords: []
				})}
			on:click={() => ($openDetailbar = false)}
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

	<div class="block mb-2">
		<a href={item.uri} target="_blank" rel="noreferrer" class="btn">Öffnen</a>
		<button class="btn">Link Kopieren</button>
	</div>

	<Tags properties={item.keywords} />

	<h1 class="text-xl font-bold">{item.name}</h1>

	<p>{item.description}</p>
</div>
