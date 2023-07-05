<script>
	import navicon from 'svelte-awesome/icons/navicon';
	import { Icon } from 'svelte-awesome';
	import { user } from '$lib/stores.js';
	import { login } from '$lib/nostr/login.js';
	import User from '$lib/User/Avatar.svelte';
</script>

<div class="dropdown dropdown-end">
	<label tabindex="0" class="btn-ghost btn-circle avatar btn">
		{#if $user.npub}
			<User user={$user} />
		{:else}
			<button class="btn-circle btn">
				<Icon data={navicon} />
			</button>
		{/if}
	</label>
	<ul
		tabindex="0"
		class="menu-sm dropdown-content menu rounded-box z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
	>
		<li><a href="/editor">Add Resource</a></li>
		{#if $user.npub}
			<li>
				<a> Logout </a>
			</li>
		{:else}
			<li><a on:click={login}>Login</a></li>
		{/if}
	</ul>
</div>
