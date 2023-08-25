<script>
	import { user as currentUser } from '$lib/stores.js';
	import VerifiedCheckIcon from '$lib/elements/icons/VerifiedCheck.svelte';
	import XMarkIcon from '$lib/elements/icons/XMark.svelte';
	import { page } from '$app/stores';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	dayjs.extend(relativeTime);
	import { createEventDispatcher } from 'svelte';
	import NoteContent from '$lib/NoteContent.svelte';
	import { getUser } from '$lib/User';
	import { Avatar, Name } from '@nostr-dev-kit/ndk-svelte-components';
	import { ndkStore as ndk } from '$lib/stores/ndk';
	// import ItemsOptionsPopover from '$lib/components/ItemsOptionsPopover.svelte';

	const dispatch = createEventDispatcher();

	export let list;
	export let note;
	// export let saved;
	export let isFeed;

	const createdTime = note.createdAt
		? new Date(note.createdAt * 1000)
		: Date.now();
	const createdTimeAgo = dayjs(createdTime).fromNow();

	const user = getUser(note.authorPubkey);

	function submitRemove() {
		dispatch('removeItemFromList', { addr: note.nip19, action: 'delete' });
	}

	// This is a gross hack to get back a real User object, not a duck-typed pseudo-user.
	let realUser;
	$: if ($currentUser) realUser = $currentUser;
</script>

<div class="flex w-full flex-row justify-between rounded border p-2 md:gap-16">
	<div class="flex flex-col gap-4">
		{#if realUser}
			<div class="flex flex-row items-center gap-4">
				<Avatar
					ndk={$ndk}
					pubkey={note.authorPubkey}
					class="h-14 w-14 rounded-full border border-zinc-200 dark:border-zinc-800"
				/>
				<div class="flex flex-col gap-0">
					<div class="item-center flex flex-col gap-2 md:flex-row">
						<h2 class="text-lg font-semibold">
							<Name ndk={$ndk} pubkey={note.authorPubkey} />
						</h2>
						{#if realUser.nip05}
							<div class="text-xs flex flex-row items-center gap-1 md:text-sm">
								<VerifiedCheckIcon />
								{realUser.truncatedNip05()}
							</div>
						{/if}
					</div>
					<div class="text-xs md:text-sm">
						<a href="https://primal.net/thread/{note.nip19}" target="_blank">
							{createdTimeAgo}
						</a>
					</div>
				</div>
			</div>
		{/if}
		<div class="break-all text-sm md:break-words md:text-base">
			<NoteContent note={note.content} tags={note.tags} />
		</div>
	</div>
	<div
		class="noteIconsWrapper flex flex-col items-center gap-4 md:flex-row md:opacity-20"
	>
		<!-- <ItemsOptionsPopover type="Event" id={note.id} /> -->
		{#if $currentUser?.pk === list.authorPubkey && !isFeed && $page.url.pathname.startsWith('/a/')}
			<button on:click={submitRemove}>
				<div data-tip="Remove this item from the list" class="tooltip">
					<XMarkIcon />
				</div>
			</button>
		{/if}
	</div>
</div>
