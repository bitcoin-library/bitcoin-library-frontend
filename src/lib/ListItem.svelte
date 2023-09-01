<script>
	// import { Avatar, Tooltip } from 'flowbite-svelte';
	import XMarkIcon from '$lib/elements/icons/XMark.svelte';
	import { nip19 } from 'nostr-tools';
	// import ItemOptionsPopover from './ItemsOptionsPopover.svelte';
	import { user as currentUser } from '$lib/stores/user.js';
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import NoteComponent from '$lib/NoteComponent.svelte';
	// import Emoji from '$lib/components/listItems/Emoji.svelte';
	// import { currentUserFollows } from '$lib/stores/currentUserFollows';
	// import { NDKEvent, NDKNip07Signer,  } from '@nostr-dev-kit/ndk';
	// import { ndkStore as ndk } from '$lib/stores/ndk';
	// import { unixTimeNow } from '$lib/utils/helpers';
	// import UserMinusIcon from '$lib/elements/icons/UserMinus.svelte';
	// import UserPlusIcon from '$lib/elements/icons/UserPlus.svelte';
	import { getNote } from '$lib/notes';

	const dispatch = createEventDispatcher();

	export let item;
	// export let privateItem: boolean = false;
	// export let action: string | undefined = undefined;
	export let list;

	let itemType;
	let itemId = item[1];
	let encodedNoteId = '';
	let person;
	let note;

	if (item[0] === 'e') {
		itemType = 'Event';
		try {
			encodedNoteId = nip19.noteEncode(itemId);
		} catch (error) {
			console.log('Error encoding note ID: ', error);
		}
		$: (async () => (note = await getNote(itemId)))();
	}

	// TODO this could be interesting. Turn on later
	// if (item[0] === 'p') {
	// 	itemType = 'Person';
	// 	person = User.get(itemId);
	// }

	// if (item[0] === 'emoji') {
	// 	itemType = 'Emoji';
	// }

	// function encodedId(hexId: string): string {
	// 	let encoded: string = '';
	// 	if (item[0] === 'e') {
	// 		try {
	// 			encoded = nip19.noteEncode(itemId);
	// 		} catch (error) {
	// 			console.log('Error encoding note ID: ', error);
	// 		}
	// 	} else {
	// 		try {
	// 			encoded = nip19.npubEncode(itemId);
	// 		} catch (error) {
	// 			console.log('Error encoding npub: ', error);
	// 		}
	// 	}
	// 	return encoded;
	// }

	// function submitRemove() {
	// 	dispatch('removeItemFromList', {
	// 		addr: encodedId(itemId),
	// 		public: privateItem ? 'private' : 'public',
	// 		action: 'delete'
	// 	});
	// }

	// function unfollow(pubkey: string | undefined) {
	// 	if ($currentUser && $currentUserFollows) {
	// 		const followerListMinusUnfollow = $currentUserFollows.filter(
	// 			(hexPubkey) => hexPubkey !== pubkey
	// 		);
	// 		// build tags for all new follows list
	// 		const tags: NDKTag[] = followerListMinusUnfollow?.map(
	// 			(followerPubkey) => ['p', followerPubkey] as NDKTag
	// 		);
	// 		// build the event & publish
	// 		let event = new NDKEvent($ndk, {
	// 			pubkey: $currentUser.pubkey,
	// 			kind: 3,
	// 			tags: tags,
	// 			content: '',
	// 			created_at: unixTimeNow()
	// 		});
	// 		const signer = new NDKNip07Signer();
	// 		$ndk.signer = signer;
	// 		event.publish().then(() => {
	// 			// update our store if the event publishes
	// 			currentUserFollows.set(tags.map((tag) => tag[1]));
	// 		});
	// 	}
	// }

	// function follow(pubkey: string | undefined) {
	// 	if ($currentUser && $currentUserFollows) {
	// 		// build tags for all current follows
	// 		const tags: NDKTag[] = $currentUserFollows?.map(
	// 			(followerPubkey) => ['p', followerPubkey] as NDKTag
	// 		);
	// 		// add the new user to follow
	// 		tags.push(['p', pubkey as string]);
	// 		// build the event & publish
	// 		let event = new NDKEvent($ndk, {
	// 			pubkey: $currentUser.pubkey,
	// 			kind: 3,
	// 			tags: tags,
	// 			content: '',
	// 			created_at: unixTimeNow()
	// 		});
	// 		const signer = new NDKNip07Signer();
	// 		$ndk.signer = signer;
	// 		event.publish().then(() => {
	// 			// update our store if the event publishes
	// 			currentUserFollows.set(tags.map((tag) => tag[1]));
	// 		});
	// 	}
	// }

	// // This is a gross hack to get back a real User object, not a duck-typed pseudo-user.
	// let realPerson: User;
	// $: if ($person) realPerson = new User($person);

	// // This is a gross hack to get back a real Note object, not a duck-typed pseudo-note.
</script>

<div class="m-2">
	{#if note}
		<NoteComponent {note} {list} isFeed={false} on:removeItemFromList />
	{/if}
</div>
