<script>
	import InfoIcon from '$lib/elements/icons/Info.svelte';
	import ChevronIcon from '$lib/elements/icons/Chevron.svelte';
	import ListItem from '$lib/ListItem.svelte';
	// import { Tooltip } from 'flowbite-svelte';
	// import ZapPopover from './ZapPopover.svelte';
	import { user as currentUser } from '$lib/stores/user.js';
	import { ndkStore as ndk } from '$lib/stores/ndk';
	import { NDKEvent, NDKNip07Signer } from '@nostr-dev-kit/ndk';
	// import ItemsOptionsPopover from '$lib/components/ItemsOptionsPopover.svelte';
	import { unixTimeNow } from '$lib/utils/helpers';
	import HeartIcon from '$lib/elements/icons/Heart.svelte';
	import { listStore, allowListEdit } from '$lib/stores/lists.js';
	import { removeList } from '$lib/utils/lists/removeList';

	export let list;

	let liked = false;
	let privateItems = [];

	/**
	 * Decrypt the content of this list, where secret tags might
	 * have been stored.
	 */
	async function decryptTags() {
		if ($currentUser?.pubkey === list.authorPubkey) {
			try {
				const signer = new NDKNip07Signer();
				$ndk.signer = signer;
				const listEvent = new NDKEvent($ndk, JSON.parse(list.event));
				const ndkUser = $ndk.getUser({ npub: $currentUser.npub });
				if (listEvent.content.length > 0) {
					await listEvent.decrypt(ndkUser);
					const decryptedItems = JSON.parse(listEvent.content);
					if (decryptedItems && decryptedItems[0]) {
						privateItems = decryptedItems;
					}
				}
			} catch (error) {
				console.error(error);
			}
		}
	}

	function checkForLikes() {
		if ($currentUser) {
			const likeFilter = {
				kinds: [7],
				authors: [$currentUser.pk],
				'#a': [list.id]
			};
			$ndk.fetchEvent(likeFilter).then((likeEvent) => {
				if (likeEvent) {
					liked = true;
				}
			});
		}
	}

	decryptTags();
	checkForLikes();

	function handleDeleteList(event) {
		// Create & publish list deletion event (kind 5)
		const deleteEvent = new NDKEvent($ndk, {
			kind: 5,
			pubkey: list.authorPubkey,
			content: 'List deleted by owner',
			tags: [['a', list.id]],
			created_at: unixTimeNow()
		});
		deleteEvent
			.publish()
			.then(() => {
				// Delete the list from the cache
				list.delete();
			})
			.catch((error) => {
				console.error(error);
			});
	}

	function likeList() {
		// For now, don't worry about "unliking" a list.
		if (!liked) {
			// Create and publish a reaction event (kind )
			const likeEvent = new NDKEvent($ndk, {
				kind: 7,
				content: '+',
				pubkey: $currentUser?.pubkey,
				created_at: unixTimeNow(),
				tags: [
					['e', list.id],
					['a', list.id],
					['p', $currentUser?.pubkey]
				]
			});
			likeEvent
				.publish()
				.then(() => {
					liked = true;
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}

	let itemCount;
	$: itemCount = list.publicItems.length + privateItems.length;
</script>

<div class="m-2 rounded border border-solid border-white p-1">
	<div class="mb-6 flex flex-row items-center gap-2 rounded md:gap-4">
		<h2
			class="flex flex-row items-center gap-1 break-words font-semibold md:text-xl"
		>
			<button on:click={() => listStore.toggleExpanded(list.id)}>
				<ChevronIcon bind:expanded={list.expanded} />
			</button>
			<!-- TODO copy this shamelessly from listr.io -->
			<!-- <a class="break-words" href="/a/{list.nip19}"> -->
			<span class="break-words">
				{list.name}
			</span>
		</h2>
		<!-- <InfoIcon /> -->
		<!-- <Tooltip -->
		<!-- 	type="custom" -->
		<!-- 	class="flex flex-col gap-1 border border-black/20 bg-zinc-100 text-sm shadow-xl dark:bg-zinc-800" -->
		<!-- > -->
		<!-- 	<span><span class="text-lg font-serif">κ</span> {list.kind}</span> -->
		<!-- 	<span class="flex md:hidden"> -->
		<!-- 		{itemCount} -->
		<!-- 		{itemCount === 1 ? 'item' : 'items'} -->
		<!-- 	</span> -->
		<!-- </Tooltip> -->
		<span class="hidden text-sm md:flex">
			{itemCount}
			{itemCount === 1 ? 'item' : 'items'}
		</span>
		<div class="ml-auto mr-0 flex flex-row gap-4">
			{#if $currentUser}
				<button on:click={likeList}
					><HeartIcon
						class="h-6 w-6 opacity-100 {liked
							? 'fill-red-500 stroke-red-500'
							: ''}"
					/>
				</button>

				{#if $allowListEdit}
					<button
						on:click={removeList(list)}
						class="btn btn-circle btn-sm ml-2 mr-1 bg-red-500"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							style="color: white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/></svg
						>
					</button>
				{/if}
			{/if}
			<!-- <ZapPopover {list} class="opacity-100" /> -->
			<!-- <ItemsOptionsPopover -->
			<!-- 	{list} -->
			<!-- 	class="opacity-100" -->
			<!-- 	on:deleteList={handleDeleteList} -->
			<!-- /> -->
		</div>
	</div>
	<div class="{list.expanded ? 'flex' : 'hidden'} flex-col gap-2">
		<!-- {#each privateItems as privateItem} -->
		<!-- 	<ListItem item={privateItem} saved={true} privateItem={true} {list} /> -->
		<!-- {/each} -->
		{#each list.publicItems as listItem}
			<ListItem item={listItem} {list} />
		{/each}
	</div>
</div>
