<script>
	import navicon from 'svelte-awesome/icons/navicon';
	import { Icon } from 'svelte-awesome';
	import { openDetailbar, selectedCard, user } from '$lib/stores.js';
	import { login } from '$lib/nostr/login.js';
	import User from '$lib/User/Avatar.svelte';
</script>

<div class="dropdown-end dropdown">
	<label tabindex="0" class="btn-ghost btn-circle avatar btn">
		<button class="btn-circle btn">
			{#if $user.npub}
				<User user={$user} />
			{:else}
				<Icon data={navicon} />
			{/if}
		</button>
	</label>
	<!-- menu items -->
	<ul
		tabindex="0"
		class="menu-sm dropdown-content menu rounded-box z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
	>
		<li>
			{#if $user.npub}
				<a
					on:click={() => {
						user.reset();
					}}
				>
					Logout
				</a>
			{:else}
				<a on:click={login}>Login</a>
			{/if}
		</li>
		<li><a href="/editor">Add Resource</a></li>
		{#if $user.npub}
			<li>
				<a
					on:click={() => {
						if ($openDetailbar === true && Object.keys($selectedCard).length) {
							selectedCard.set({});
							user.update((u) => ({ ...u, showDetails: true }));
						} else if (
							$openDetailbar === true &&
							!Object.keys($selectedCard).length
						) {
							$openDetailbar = false;
							user.update((u) => ({ ...u, showDetails: false }));
						} else {
							$openDetailbar = true;
							user.update((u) => ({ ...u, showDetails: true }));
						}
					}}>My Lists</a
				>
			</li>
		{/if}
	</ul>
</div>
