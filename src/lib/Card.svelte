<script>
	import { user, openDetailbar, selectedCard } from '$lib/stores';
	import Tags from './Resource/Tags.svelte';
	import { plus, check } from 'svelte-awesome/icons';
	import { Icon } from 'svelte-awesome';
	import { addResourceToLists } from '$lib/nostr/addResourceToLists.js';

	export let item;
	let modalOpen = false;
	const bordered = 'border-2 border-orange-500';
	function toggleModal() {
		modalOpen = !modalOpen;
	}

	// Shorten a string to less than maxLen characters without truncating words.
	function shorten(str = '', maxLen, separator = ' ') {
		if (str.length <= maxLen) return str;
		return str.substr(0, str.lastIndexOf(separator, maxLen));
	}

	let selectedLists = [];
	function handleListSelect(i) {
		const index = selectedLists.indexOf(i);
		if (index === -1) {
			selectedLists = [...selectedLists, i];
		} else {
			selectedLists = selectedLists.filter((l) => l !== i);
		}
	}
</script>

<!-- TODO make flex column and assign space values -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="h-112 card card-compact relative m-2 w-80  bg-base-100 hover:border-2 hover:border-orange-500 {$selectedCard ==
	item
		? bordered
		: 'border-2 border-white'}"
>
	<div
		on:click={() => ($openDetailbar = true)}
		on:click={() => user.update((u) => ({ ...u, showDetails: false }))}
		on:click={() => selectedCard.set(item)}
	>
		<!-- only display if item.last updated is not older than a week  -->
		{#if item.updated_at > Date.now() - 86400000}
			<div class="po badge-secondary badge absolute top-2 right-6">NEW</div>
		{/if}
		<figure>
			<img
				class="h-48 object-cover p-4"
				src={item.image || './images/Bitcoin.png'}
				alt="Here could be your image"
			/>
		</figure>
		<div class="card-body">
			<div class="justify-end">
				<Tags properties={item.keywords} />
			</div>
			<h2 class="card-title">
				{item.name}
			</h2>
			<p>{shorten(item.description, 120)} [...]</p>
		</div>
	</div>
	{#if $user.npub}
		<label
			for="add-list-modal"
			class="btn-circle btn mr-2 mb-2 mt-auto ml-auto bg-orange-500 hover:bg-orange-500"
		>
			<Icon style="color: black" data={plus} />
		</label>
	{/if}
</div>

<!-- add list modal -->
<input type="checkbox" id="add-list-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative">
		<label
			for="add-list-modal"
			class="btn-sm btn-circle btn absolute right-2 top-2">✕</label
		>
		<h3 class="text-lg font-bold">Select the lists to add this resource!</h3>
		{#each $user.lists as list (list.id)}
			<div
				on:click={handleListSelect(list.id)}
				class="m-2 flex flex-row items-center rounded border border-solid border-white p-2 hover:bg-orange-500 hover:text-black"
				class:bg-orange-500={selectedLists.includes(list.id)}
				class:text-black={selectedLists.includes(list.id)}
			>
				<p class="text-xl font-bold">
					#
					<span class="underline">
						{list.tags.find((l) => l[0] === 'd')[1]}
					</span>
				</p>
				{#if selectedLists.includes(list.id)}
					<Icon class="ml-auto mr-2" style="color: black;" data={check} />
				{/if}
			</div>
		{/each}
		<label
			class="btn"
			on:click={addResourceToLists(selectedLists, $selectedCard.eventID)}
			>Add Resource To Lists</label
		>
	</div>
</div>
