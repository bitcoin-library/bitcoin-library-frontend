<script>
	export let lists;
	export let selectedListIDs = [];

	import { sortListOfObjects } from '$lib/utils.js';
	import { removeList } from '$lib/nostr/removeList.js';
	import { removeItemFromList } from '$lib/nostr/removeItemFromList.js';
	import { publishNoteEvent } from '$lib/nostr/publishNoteEvent';
	import { addResourceToLists } from '$lib/nostr/addResourceToLists';
	import { addList } from '$lib/nostr/addList';

	import { plus, pencil, shareAlt } from 'svelte-awesome/icons';
	import { Icon } from 'svelte-awesome';

	import { user } from '$lib/stores';
	let index;
	let noteContent;
	let currentList;
	let allowEdit = false;
	let listName;

	async function fetchResourcesFromEventTags(event) {
		const response = await fetch('/api/resources', {
			method: 'POST',
			body: JSON.stringify({ event })
		});
		const res = await response.json();
		return res;
	}

	async function addNoteToList() {
		const event = await publishNoteEvent(noteContent);
		await addResourceToLists([currentList.id], event.id, index);
	}
	$: listsToShow = selectedListIDs.length
		? lists.filter((l) => selectedListIDs.includes(l.id))
		: lists;
</script>

{#if $user.npub}
	<div class="form-control my-2 flex flex-row gap-2">
		<label for="my-modal" class="btn">Create New List</label>
		<label class="label ml-auto cursor-pointer">
			<Icon class="mr-2" style="color: orange" data={pencil} />
			<input
				type="checkbox"
				class="toggle-success toggle"
				on:click={() => (allowEdit = !allowEdit)}
			/>
		</label>
	</div>
{/if}
{#each sortListOfObjects(listsToShow) as list (list.id)}
	<div class="mb-2 rounded border border-solid border-white p-2">
		<div class="flex flex-row">
			<p class="text-xl font-bold">
				#
				<a href="/b/{list.id}" class="underline">
					{list.tags.find((l) => l[0] === 'd')[1]}
				</a>
			</p>
			<button class="mr-auto ml-2">
				<Icon data={shareAlt} />
			</button>
			{#if allowEdit}
				<button
					on:click={removeList(list.id)}
					class="btn-sm btn-circle btn ml-2 mr-1 bg-red-500"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						style="color: white"
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
			{/if}
		</div>
		{#await fetchResourcesFromEventTags(list) then resources}
			{#each resources as resource, i}
				<!-- We want to skip the name of the list provided by the d tag -->
				<div
					class="m-2 flex flex-row rounded border border-solid border-white p-2"
				>
					<div class="w-48">
						<a class="underline" href={resource.uri}>
							{#if resource.type === 'LearningResource'}
								<!-- {(console.log(resource), '')} -->
								<p class="truncate">{resource.name}</p>
							{:else}
								<p class="text-xl">{resource.content}</p>
							{/if}
						</a>
					</div>
					{#if allowEdit}
						<button
							on:click={removeItemFromList(list, i)}
							class="btn-sm btn-circle btn ml-auto mr-1 bg-red-500"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								style="color: white"
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
					{/if}
				</div>
				{#if allowEdit}
					<div class="flex justify-center">
						<label
							on:click={() => (index = i)}
							on:click={() => (currentList = list)}
							for="modal-add-note"
							class="btn-sm btn-circle btn bg-orange-500 hover:bg-orange-500"
						>
							<Icon style="color: black" data={plus} />
						</label>
					</div>
				{/if}
			{/each}
		{/await}
	</div>
{/each}

<!-- add event modal -->
<input type="checkbox" id="modal-add-note" class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative">
		<label
			for="modal-add-note"
			class="btn-sm btn-circle btn absolute right-2 top-2">✕</label
		>
		<h3 class="text-lg font-bold">Add Info</h3>
		<textarea
			bind:value={noteContent}
			class="textarea-lg textarea-bordered textarea block w-full max-w-xs"
			placeholder="Content"
		/>
		<!-- publish the event -->
		<!-- add the event to the list -->
		<!-- update the list -->
		<label for="modal-add-note" on:click={addNoteToList} class="btn">Add</label
		>
	</div>
</div>

<!-- add list modal -->
<input type="checkbox" id="my-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative">
		<label for="my-modal" class="btn-sm btn-circle btn absolute right-2 top-2"
			>✕</label
		>
		<h3 class="text-lg font-bold">Create New List</h3>
		<form>
			<label for="name">Name</label>
			<input
				type="text"
				class="input-bordered input w-full max-w-xs"
				id="name"
				bind:value={listName}
			/>
		</form>
		<div class="modal-action">
			<label on:click={addList(listName)} for="my-modal" class="btn"
				>Create!</label
			>
		</div>
	</div>
</div>
