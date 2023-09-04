<script>
	import navicon from 'svelte-awesome/icons/navicon';
	import { Icon } from 'svelte-awesome';
	import { user, activeMenu } from '$lib/stores/user.js';
	import { login } from '$lib/nostr/login.js';
	import { ndkStore as ndk } from '$lib/stores/ndk';
	import { Avatar } from '@nostr-dev-kit/ndk-svelte-components';
</script>

<div class="dropdown-end dropdown">
	<label tabindex="0" class="avatar btn btn-circle">
		<button class="btn btn-circle">
			{#if $user.npub}
				<Avatar ndk={$ndk} pubkey={$user.pk} class="h-14 w-14 rounded-full" />
			{:else}
				<Icon data={navicon} />
			{/if}
		</button>
	</label>
	<!-- menu items -->
	<ul
		tabindex="0"
		class="menu dropdown-content rounded-box z-[1] w-52 bg-base-300 p-2 shadow"
	>
		{#if !$user.npub}
			<li>
				<button on:click={login}>Login</button>
			</li>
		{/if}
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

		{#if $user.npub}
			<li>
				<button on:click={() => user.reset()}>Logout</button>
			</li>
		{/if}
	</ul>
</div>
