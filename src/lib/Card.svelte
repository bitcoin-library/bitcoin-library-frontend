<script>
	import { openDetailbar, selectedCard } from '$lib/stores';

	export let item;
	let modalOpen = false;
	const bordered = 'border-2 border-orange-500';
	function toggleModal() {
		modalOpen = !modalOpen;
	}

	// Shorten a string to less than maxLen characters without truncating words.
	function shorten(str="", maxLen, separator = ' ') {
		if (str.length <= maxLen) return str;
		return str.substr(0, str.lastIndexOf(separator, maxLen));
	}
	// $: console.log(item)
</script>

<!-- TODO make flex column and assign space values -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="card card-compact relative m-2 h-112 w-80  bg-base-100 hover:border-2 hover:border-orange-500 {$selectedCard ==
	item
		? bordered
		: 'border-2 border-white'}"
	on:click={() => ($openDetailbar = true)}
	on:click={() => selectedCard.set(item)}
>
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<div class="po badge-secondary badge absolute top-2 right-6">NEW</div>
	<figure>
		<img
			class="h-48 object-cover p-4"
			src={item.image || './images/Bitcoin.png'}
			alt="Here could be your image"
		/>
	</figure>
	<div class="card-body">
		<div class="card-actions justify-end">
			<div class="badge-outline badge">foo</div>
			<div class="badge-outline badge">bar</div>
		</div>
		<h2 class="card-title">
			{item.name}
		</h2>
		<p>{shorten(item.description, 120)} [...]</p>
		<div class="flex flex-row justify-start">
			<img
				class="mask mask-circle h-12"
				src="https://placeimg.com/80/80/people"
			/>
			<div class="ml-2 basis-2/3">Author X</div>
			<div>Zap!</div>
		</div>
	</div>
</div>
