<script>
	import SearchHeader from './Search/SearchHeader.svelte';
	import { login } from '$lib/nostr/login.js';
	import { user, openDetailbar, activeMenu } from '$lib/stores.js';
	import User from '$lib/User/Avatar.svelte';
	import Menu from './Menu.svelte';

	$: console.log($user);
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
	<div class="visible ml-auto sm:hidden">
		<Menu />
	</div>
	<div class="hidden sm:visible sm:flex sm:flex-row ">
		<SearchHeader />
	</div>
	<div class="hidden gap-2 self-start sm:flex">
		<a href="/editor" class="btn">Add Resource</a>
		{#if $user.npub}
			<Menu />
		{:else}
			<button class="btn" on:click={login}>Login</button>
		{/if}
	</div>
</div>
<div class="visible flex w-full flex-col sm:hidden">
	<div class="visible m-2 justify-center sm:hidden">
		<SearchHeader />
	</div>
</div>
