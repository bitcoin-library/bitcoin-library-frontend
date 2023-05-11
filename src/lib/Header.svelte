<script>
	import SearchHeader from './Search/SearchHeader.svelte';
	import { login } from '$lib/nostr/login.js';
	import { user } from '$lib/stores.js';
	import User from '$lib/User/Avatar.svelte';

	$: console.log($user);
</script>

<div class="navbar sticky top-0 z-50 bg-base-100">
	<a href="/" class=" btn-ghost btn absolute top-0 text-xl normal-case"
		>Bitcoin-Library</a
	>
	<div class="mx-auto">
		<SearchHeader />
	</div>
	{#if $user.npub}
		<User user={$user} />
	{:else}
		<button class="btn ml-auto mr-5" on:click={login}>Login</button>
	{/if}
</div>
