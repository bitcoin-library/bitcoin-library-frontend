<script>
	export let data;

	import { listStore, allowListEdit } from '$lib/stores/lists.js';
	import { user, activeMenu } from '$lib/stores/user.js';
	import { login } from '$lib/nostr/login.js';

	import Menu from '$lib/Menu.svelte';
	import ListComponent from '$lib/List.svelte';
	import { Icon } from 'svelte-awesome';
	import { addList } from '$lib/utils/lists/addList';
	import { plus, pencil, shareAlt } from 'svelte-awesome/icons';

	if (data.pubkey) {
		listStore.getListsForUser(data.pubkey);
	}

	let listName;
</script>

<!-- header -->
<div
	class="navbar sticky top-0 flex flex-row justify-between gap-2 bg-base-100"
>
	<a
		on:click={() => activeMenu.reset()}
		href="/"
		class="self-start text-xl font-bold">Bitcoin-Library</a
	>
	<div class="visible ml-auto md:hidden">
		<Menu />
	</div>
	<div class="hidden gap-2 self-start md:flex">
		<a
			href="/editor"
			class:hidden={$activeMenu.addResource}
			on:click={() => activeMenu.update((m) => ({ ...m, addResource: true }))}
			class="btn">Add Resource</a
		>
		{#if $user.npub}
			<Menu />
		{:else}
			<button class="btn" on:click={login}>Login</button>
		{/if}
	</div>
</div>
<!-- mobile view -->
{#if !$activeMenu.addResource}
	<div class="visible flex w-full flex-col md:hidden">
		<div class="m-2 justify-center md:hidden" />
	</div>
{/if}

<div class="mx-auto w-full px-2 sm:w-3/4">
	{#if $user.npub}
		<div class="form-control my-2 flex flex-row gap-2">
			<label for="create-list-modal" class="btn">Create New List</label>
			<label class="label ml-auto cursor-pointer">
				<Icon class="mr-2" style="color: orange" data={pencil} />
				<input
					type="checkbox"
					class="toggle toggle-success"
					on:click={() => ($allowListEdit = !$allowListEdit)}
				/>
			</label>
		</div>
	{/if}

	{#if !data.pubkey}
		<p>Did not find that pubkey :(</p>
	{/if}
	{#if !$listStore.length}
		Loading...
	{:else}
		{#each $listStore as list, i}
			<ListComponent {list} />
		{/each}
	{/if}
</div>

<!-- add list modal -->
<input type="checkbox" id="create-list-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative">
		<label for="my-modal" class="btn btn-circle btn-sm absolute right-2 top-2"
			>✕</label
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
