<script>
	import { ndkStore as ndk } from '$lib/stores/ndk';
	import { parseContent } from '$lib/utils/nip27';
	import { truncatedBech } from '$lib/utils/helpers';
	import { getUser } from './User';

	export let note;
	export let tags;
	export let addNewLines = true;
	let notePrev;

	const links = [];
	const entities = [];
	const ranges = [];

	let anchorId;
	let content;
	let user;

	function fetchUsername(ndkUser) {
		let name;
		return new Promise((resolve, reject) => {
			ndkUser.fetchProfile().then(() => {
				name =
					ndkUser.profile?.displayName ||
					ndkUser.profile?.name ||
					truncatedBech(ndkUser.npub);
				resolve(name);
			});
		});
	}

	$: if (note && note !== notePrev) {
		notePrev = note;

		content = parseContent(note || '', tags);

		// Find links and preceding whitespace
		for (let i = 0; i < content.length; i++) {
			const { type, value } = content[i];

			if (type === 'nostr:npub') {
				user = getUser(value.id);
			}

			if (type === 'nostr:nprofile') {
				user = getUser(value.pubkey);
			}

			if (
				(type === 'link' && !value.startsWith('ws')) ||
				['nostr:note', 'nostr:nevent'].includes(type)
			) {
				if (type === 'link') {
					links.push(value);
				} else if (value.id !== anchorId) {
					entities.push({ type, value });
				}

				const prev = content[i - 1];
				const next = content[i + 1];

				if (
					(!prev || prev.type === 'newline') &&
					(!next || next.type === 'newline')
				) {
					let n = 1;
					for (let j = i - 1; ; j--) {
						if (content[j]?.type === 'newline') {
							n += 1;
						} else {
							break;
						}
					}

					ranges.push({ i: i + 1, n });
				}
			}
		}
	}
</script>

<div>
	{#if content}
		{#each content as { type, value }}
			{#if type === 'newline'}
				{#each value as _}
					{#if addNewLines}
						<br />
					{/if}
				{/each}
			{:else if type === 'link'}
				<a href={value} target="_blank">
					{value.replace(/https?:\/\/(www\.)?/, '')}
				</a>
			{:else if type === 'image'}
				<img src={value} class="my-2 md:w-2/3" alt={value} />
			{:else if type.startsWith('nostr:')}
				{#if value.entity.startsWith('npub')}
					<a href="https://primal.net/profile/{value.entity}">
						{#await fetchUsername($ndk.getUser( { npub: value.entity } )) then name}
							@{name}
						{/await}
					</a>
				{:else if value.pubkey}
					<a href="https://primal.net/profile/{value.pubkey}">
						{#await fetchUsername($ndk.getUser( { hexpubkey: value.pubkey } )) then name}
							@{name}
						{/await}
					</a>
				{:else}
					<div
						class="embedded-card mt-2 rounded-sm border border-zinc-800/20 p-2 dark:border-zinc-100/20"
					>
						<a href="https://primal.net/thread/{value.entity}" target="_blank">
							{truncatedBech(value.entity, 21)}
						</a>
					</div>
				{/if}
			{:else if type === 'topic'}
				<b>#{value}</b>
			{:else}
				{@html value}
			{/if}
		{/each}
	{/if}
</div>
