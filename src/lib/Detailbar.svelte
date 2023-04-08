<script>
	import { openDetailbar, selectedCard } from '$lib/stores';

	export let item = {
		keywords: []
	};

	// calculate proportion of total events that set this attribute
	// $: proportion = Math.round((item.count / $totalHits) * 100);
	function calcProportion(arr, item) {
		// sort an array of objects by the lenght of their 'addedByEvent' array
		arr.sort((a, b) => b.addedByEvent.length - a.addedByEvent.length);
		const proportion = Math.round((item.addedByEvent.length / arr[0].addedByEvent.length) * 100);
		console.log(`opacity-[.${proportion}]`)
		return `opacity-[.${proportion}]`

	}

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

	<div class="block">
		<a href={item.uri} target="_blank" rel="noreferrer" class="btn">Öffnen</a>
		<button class="btn">Link Kopieren</button>
	</div>

	{#each item.keywords as keyword}
		<span class="badge-warning badge badge-lg m-2 {calcProportion(item.keywords, keyword)}">{keyword.title}</span>
	{/each}

	<h1 class="text-xl font-bold">{item.name}</h1>

	<p>{item.description}</p>
</div>
