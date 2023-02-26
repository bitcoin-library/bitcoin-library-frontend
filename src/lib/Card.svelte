<script>
	// @ts-nocheck

	import CardModal from '$lib/CardModal.svelte';
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
<div
	class="card bg-base-100 shadow-xl m-2 max-w-256 min-w-224 hover:border-2 hover:border-orange-500 {$selectedCard == item ? bordered : ''}"
	on:click={() => $openDetailbar = true}
	on:click={() => selectedCard.set(item)}
>
	<CardModal {item} bind:modalOpen />
  <figure ><img class="rounded-t-2xl" src={item.thumbnail} alt="Here could be your image" /></figure>
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
		<label on:click={toggleModal} class="btn" for={item.url}>Show Details</label>
	</div>
</div>
