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
	import AddResource from './AddResource.svelte';

	$: console.log($activeMenu);
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
					on:click={() => {
						if (
							$openDetailbar === true &&
							Object.values($selectedCard).some((e) => e.length)
						) {
							selectedCard.set({});
							user.update((u) => ({ ...u, showDetails: true }));
						} else if (
							$openDetailbar === true &&
							!Object.keys($selectedCard).length
						) {
							$openDetailbar = false;
							user.update((u) => ({ ...u, showDetails: false }));
						} else if ($openDetailbar && $user.showDetails) {
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
