<script>
	import { addList } from '$lib/utils/lists/addList';
	let listName;
</script>

<!-- add list modal -->
<input type="checkbox" id="create-list-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative">
		<label
			for="create-list-modal"
			class="btn btn-circle btn-sm absolute right-2 top-2">✕</label
		>
		<h3 class="text-lg font-bold">Create New List</h3>
		<form>
			<label for="name">Name</label>
			<input
				type="text"
				class="input input-bordered w-full max-w-xs"
				id="name"
				bind:value={listName}
			/>
		</form>
		<div class="modal-action">
			<label on:click={addList(listName)} for="create-list-modal" class="btn"
				>Create!</label
			>
		</div>
	</div>
</div>
