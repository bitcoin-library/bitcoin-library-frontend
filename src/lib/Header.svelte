<script>
	import SearchHeader from './Search/SearchHeader.svelte';
	import { login } from '$lib/nostr/login.js';
	import { user, openDetailbar, activeMenu } from '$lib/stores.js';
	import Menu from './Menu.svelte';
</script>

<div
	class="navbar sticky top-0 z-50 flex flex-row justify-between gap-2 bg-base-100"
>
	<a
		on:click={() => ($openDetailbar = false)}
		on:click={() => activeMenu.reset()}
		href="/"
		class="self-start text-xl font-bold">Bitcoin-Library</a
	>
	<div class="visible ml-auto md:hidden">
		<Menu />
	</div>
	<div class="hidden md:visible md:flex md:flex-row ">
		{#if !$activeMenu.addResource}
			<SearchHeader />
		{/if}
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
		<div class="m-2 justify-center md:hidden">
			<SearchHeader />
		</div>
	</div>
{/if}
