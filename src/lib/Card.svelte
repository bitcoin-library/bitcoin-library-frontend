<script>
	import { openDetailbar, selectedCard } from '$lib/stores';

	export let item;
	let modalOpen = false;
	const bordered = 'border-2 border-orange-500';
	function toggleModal() {
		modalOpen = !modalOpen;
	}

	// Shorten a string to less than maxLen characters without truncating words.
	function shorten(str, maxLen, separator = ' ') {
		if (str.length <= maxLen) return str;
		return str.substr(0, str.lastIndexOf(separator, maxLen));
	}
</script>

<!-- TODO make flex column and assign space values -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="card card-compact bg-base-100 shadow-xl max-w-256 min-w-224 hover:border-2 hover:border-orange-500 h-full {$selectedCard ==
	item
		? bordered
		: ''}"
	on:click={() => ($openDetailbar = true)}
	on:click={() => selectedCard.set(item)}
>
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<figure><img class="rounded-t-2xl h-40" src={item.thumbnail} alt="Here could be your image" /></figure>
	<div class="card-body">
		<div class="badge badge-secondary">NEW</div>
		<h2 class="card-title">
			{item.name}
		</h2>
		<!-- <p>{shorten(item.description, 120)} [...]</p> -->
		<div class="card-actions justify-end">
			<div class="badge badge-outline">foo</div>
			<div class="badge badge-outline">bar</div>
		</div>
	</div>
</div>
