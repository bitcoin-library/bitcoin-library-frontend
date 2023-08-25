<script>
	import navicon from 'svelte-awesome/icons/navicon';
	import { Icon } from 'svelte-awesome';
	import {
		openDetailbar,
		selectedCard,
		user,
		activeMenu
	} from '$lib/stores.js';
	import { login } from '$lib/nostr/login.js';
	import User from '$lib/User/Avatar.svelte';
</script>

<div class="dropdown-end dropdown">
	<label class="avatar btn btn-circle btn-ghost">
		<button class="btn btn-circle">
			{#if $user.npub}
				<User user={$user} />
			{:else}
				<Icon data={navicon} />
			{/if}
		</button>
	</label>
	<!-- menu items -->
	<ul
		on:click={() => {
			if (document.activeElement instanceof HTMLElement) {
				document.activeElement.blur();
			}
		}}
		class="dropdown-content menu menu rounded-box z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
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
		<li>
			<a
				href={!$activeMenu.addResource ? '/' : '/editor'}
				class:active={$activeMenu.addResource}
				on:click={() =>
					activeMenu.update((m) => ({
						...m,
						addResource: !m.addResource
					}))}>Add Resource</a
			>
		</li>

		{#if $user.npub}
			<li>
				<!-- TODO rework the second on:click stuff  -->
				<a
					class:active={$activeMenu.lists}
					on:click={() =>
						activeMenu.update((m) => ({ ...m, lists: !m.lists }))}
					href="/{$user.npub}">My Lists</a
				>
			</li>
		{/if}
	</ul>
</div>
