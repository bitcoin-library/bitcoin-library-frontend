<script>
	import { user, selectedCard } from '$lib/stores/user.js';
	import { openFilterbar } from '$lib/stores/search.js';
	import Tags from '$lib/Resource/Tags.svelte';
	import { plus, check } from 'svelte-awesome/icons';
	import { Icon } from 'svelte-awesome';
	import { addResourceToLists } from '$lib/utils/lists/addResourceToLists';
	import ModalCreateList from '$lib/ModalCreateList.svelte';

	export let item;
	let modalOpen = false;
	const bordered = 'border-2 border-orange-500';

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

<div
	class="h-112 m-2 flex flex w-80 flex-col rounded-lg bg-base-100 p-2 hover:cursor-pointer hover:border-2 hover:border-orange-500 {$selectedCard ==
	item
		? bordered
		: 'border-2 border-white'}"
>
	<div
		class="flex flex-col justify-items-center"
		on:click={() => {
			$openFilterbar = false;
			selectedCard.set(item);
		}}
	>
		<img
			class="h-48 object-cover"
			src={item.image || './images/Bitcoin.png'}
			alt="Here could be your image"
		/>
		<div class="justify-end p-1">
			<Tags properties={item.keywords} />
		</div>
		<h2 class="card-title">
			{item.name}
		</h2>
		<p>{shorten(item.description, 120)} [...]</p>
	</div>
	{#if $user.npub}
		<label
			for="add-list-modal"
			class="btn btn-circle mb-2 ml-auto mr-2 mt-auto bg-orange-500 hover:bg-orange-500"
			on:click={() => selectedCard.set(item)}
		>
			<Icon style="color: black" data={plus} />
		</label>
	{/if}
</div>

<!-- add list modal -->
<input type="checkbox" id="add-list-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative flex flex-col">
		<label
			for="add-list-modal"
			class="btn btn-circle btn-sm absolute right-2 top-2">✕</label
		>
		<h3 class="text-lg font-bold">Select the lists to add this resource!</h3>
		{#if $user.pk}
			{#each $user.lists as list}
				<!-- check if the resource is already on the list -->
				{#if list.publicItems.some((listItem) => listItem[1] === $selectedCard.eventID)}
					<div
						class="m-2 flex flex-row items-center rounded border border-solid border-white bg-green-500 p-2 text-black"
					>
						<p class="text-xl font-bold">
							#
							<span class="underline">
								{list.name}
							</span>
						</p>
						<Icon class="ml-auto mr-2" style="color: black;" data={check} />
					</div>
				{:else}
					<div
						on:click={handleListSelect(list.eventId)}
						class="m-2 flex flex-row items-center rounded border border-solid border-white p-2 hover:bg-orange-500 hover:text-black"
						class:bg-green-500={list.publicItems.some(
							(listItem) => listItem[1] === $selectedCard.eventID
						)}
						class:bg-orange-500={selectedLists.includes(list.eventId)}
						class:text-black={selectedLists.includes(list.eventId)}
					>
						<p class="text-xl font-bold">
							#
							<span class="underline">
								{list.name}
							</span>
						</p>
						{#if selectedLists.includes(list.eventId)}
							<Icon class="ml-auto mr-2" style="color: black;" data={check} />
						{/if}
					</div>
				{/if}
			{/each}
		{/if}
		<div class="flex flex-row">
			<label
				class="btn"
				on:click={addResourceToLists(selectedLists, $selectedCard.eventID)}
				on:click={() => (selectedLists = [])}>Add Resource To Lists</label
			>
			<label for="create-list-modal" class="btn ml-auto mr-0"
				>Create New List</label
			>
		</div>
	</div>
</div>

<ModalCreateList />
