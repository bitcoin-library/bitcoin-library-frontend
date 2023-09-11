<script>
	import { page } from '$app/stores';
	import SearchHeader from './Search/SearchHeader.svelte';
	import { login } from '$lib/nostr/login.js';
	import { user, activeMenu } from '$lib/stores/user.js';
	import Menu from './Menu.svelte';
</script>

<div
	class="navbar top-0 flex flex-row items-center justify-between gap-2 bg-base-100 md:sticky"
>
	<a href="/" class="text-xl font-bold">Bitcoin-Library</a>
	<div class="visible ml-auto md:hidden">
		<Menu />
	</div>
	<div class="hidden md:visible md:flex md:flex-row">
		{#if $page.route.id !== '/editor'}
			<SearchHeader />
		{/if}
	</div>
	<div class="hidden gap-2 self-start md:flex">
		{#if !$page.route.id === '/editor'}
			<a
				href="/editor"
				class:hidden={$activeMenu.addResource}
				on:click={() =>
					activeMenu.update((m) => ({ ...m, addResource: true }))}
				class="btn">Add Resource</a
			>
		{/if}
		{#if $user.npub}
			<Menu />
		{:else}
			<button class="btn" on:click={login}>Login</button>
		{/if}
	</div>
</div>
<!-- mobile view -->
{#if !$activeMenu.addResource}
	<div class="navbar visible flex w-full flex-col md:hidden">
		<div class="m-2 justify-center md:hidden">
			<SearchHeader />
		</div>
	</div>
{/if}
