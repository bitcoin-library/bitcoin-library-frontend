<script>
	import { login } from '$lib/nostr/login.js';
	import { user } from '$lib/stores.js';
	import User from '$lib/User/Avatar.svelte';

	$: console.log($user);
</script>

<div class="navbar sticky top-0 z-50 flex flex-row gap-2 bg-base-100">
	<a href="/" class=" btn-ghost btn text-xl normal-case">Bitcoin-Library</a>
	{#if $user.npub}
		<User user={$user} />
	{:else}
		<button class="btn ml-auto mr-5" on:click={login}>Login</button>
	{/if}
</div>
