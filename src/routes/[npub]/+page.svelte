<script>
	export let data;

	import { listStore, allowListEdit } from '$lib/stores/lists.js';
	import { user, activeMenu } from '$lib/stores/user.js';
	import { login } from '$lib/nostr/login.js';

	import Menu from '$lib/Menu.svelte';
	import ListComponent from '$lib/List.svelte';
	import { Icon } from 'svelte-awesome';
	import ModalCreateList from '$lib/ModalCreateList.svelte';
	import { pencil } from 'svelte-awesome/icons';

	if (data.pubkey) {
		listStore.getListsForUser(data.pubkey);
	}
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

<ModalCreateList />
