<script>
	import { user } from '$lib/stores';
	import { addList } from '$lib/nostr/addList.js';

	let listName;
	$: console.log($user);
</script>

<div class="no-scrollbar sticky top-0 mr-4 mb-4 h-screen overflow-auto pl-12">
	<p>Hello {$user.profile.displayName}</p>
	<label for="my-modal" class="btn">Create New List</label>
	{#each [...$user.lists] as list}
		<div class="rounded border border-solid border-white p-2">
			<p class="text-xl font-bold">
				#
				<span class="underline">
					{list.tags.find((l) => l[0] === 'd')[1]}
				</span>
			</p>
			{#each list.tags.filter((l) => l[0] !== 'd') as tag}
				<div class="m-2 rounded border border-solid border-white p-2">
					<p>{tag[1]}</p>
				</div>
			{/each}
		</div>
	{/each}
	<button
		on:click={() => {
			user.reset();
		}}
		class="btn mt-2">Logout</button
	>
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
