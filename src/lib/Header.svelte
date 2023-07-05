<script>
	import SearchHeader from './Search/SearchHeader.svelte';
	import { login } from '$lib/nostr/login.js';
	import { user } from '$lib/stores.js';
	import User from '$lib/User/Avatar.svelte';
	import Menu from './Menu.svelte';

	$: console.log($user);
</script>

<div class="navbar sticky top-0 z-50 flex flex-row gap-2 bg-base-100">
	<a href="/" class=" text-xl">Bitcoin-Library</a>
	<div class="visible ml-auto sm:invisible">
		<Menu />
	</div>
	<!-- <div class="invisible flex-grow justify-center sm:visible"> -->
	<!-- 	<SearchHeader /> -->
	<!-- 	<a href="/editor" class="btn">Add Resource</a> -->
	<!-- 	{#if $user.npub} -->
	<!-- 		<User user={$user} /> -->
	<!-- 	{:else} -->
	<!-- 		<button class="btn" on:click={login}>Login</button> -->
	<!-- 	{/if} -->
	<!-- </div> -->
</div>
<div class="visible flex w-full flex-col sm:invisible">
	<div class="visible m-2 justify-center sm:invisible">
		<SearchHeader />
	</div>
</div>
