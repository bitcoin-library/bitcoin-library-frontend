<script>
	import { schema } from '$lib/schemas/editor/schema.js';
	import { resource, chosenBots, published } from '$lib/stores/editor.js';
	import Multiselect from '$lib/editor/Multiselect.svelte';
	import { submitMultipleEvents } from '$lib/nostr/editor/submitToRelay';
	import bots from '$lib/bots/bots.json';
	import createTextNote from '$lib/nostr/editor/createEventTextNote';
	import { getSelecetedBotsFromMetadata } from '$lib/utils';
	import { genNpub } from '$lib/nostr/editor/genNip19.js';
	import Author from '$lib/editor/Author.svelte';
	import { generateShortId } from '$lib/utils.js';
	import MdContributor from '$lib/editor/MDContributor.svelte';

	export let data;
	const { properties } = schema;
	let events = [];

	function onSubmit() {
		console.log('submit resource', $resource);
		const publishBots = getSelecetedBotsFromMetadata($resource, bots);
		chosenBots.set(publishBots);
		events = publishBots.map((bot) => createTextNote(bot, $resource));
		submitMultipleEvents(events);
		published.set(true);
	}

	function isValidHttpUrl(string) {
		let url;
		try {
			url = new URL(string);
		} catch (_) {
			return false;
		}
		return url.protocol === 'http:' || url.protocol === 'https:';
	}

	function checkResource(res) {
		if (!res['id'] && !isValidHttpUrl(res['id'])) {
			return false;
		}
		if (!res['name']) {
			return false;
		}

		return true;
	}

	$: if (Object.keys(data).length !== 0) {
		for (const [key, value] of Object.entries(data)) {
			value && resource.updateResource({ id: key }, value);
		}
	}

	async function copyToClipboard(event) {
		const text = event.target.innerText;
		await navigator.clipboard.writeText(text);
	}

	async function handleURL() {
		const url = $resource.id;
		const response = await fetch('/api/getExternalPageData', {
			method: 'POST',
			body: JSON.stringify({ url }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const metadata = await response.json();
		if (Object.keys(metadata).length) {
			$resource.name = metadata?.name || $resource.name;
			$resource.description = metadata?.description || $resource.description;
			$resource.image = metadata?.image || $resource.image;
		}
		// const metadata = getMetadataFromURL(new URL($resource.id));
	}

	$: enablePublish = checkResource($resource);
	$: console.log($resource);
</script>

<div class="flex flex-col p-2">
	{#if !$published}
		<form on:submit|preventDefault={onSubmit}>
			<div class="form-control">
				{#if $resource.image}
					<img class="h-48 object-contain" src={$resource.image} alt="" />
				{/if}
				<div>
					<label for="url" class="label">URL of ressource</label>
					<input
						id="url"
						on:change={handleURL}
						bind:value={$resource.id}
						type="text"
						class="input-bordered input"
					/>
				</div>
				<div>
					<label class="label">
						{properties.name.title}
					</label>
					<input
						bind:value={$resource.name}
						class="input-bordered input"
						type="text"
					/>
				</div>
				<div>
					<label class="label">
						{properties.description.title}
					</label>
					<textarea
						bind:value={$resource.description}
						class="textarea-bordered textarea"
						placeholder="Beschreibung"
					/>
				</div>
				<div>
					<label class="label"> Image URL </label>
					<input
						bind:value={$resource.image}
						class="input-bordered input"
						type="text"
					/>
				</div>
				<div>
					<label for="">
						{properties.resourceType.title}
						<Multiselect property={properties.resourceType} />
					</label>
				</div>
				<div>
					<label for="">
						{properties.keywords.title}
						<Multiselect property={properties.keywords} />
					</label>
				</div>
				<div class="mt-4 flex flex-row items-center gap-2">
					<label>Author(s)</label>
					<label
						on:click={() =>
							($resource.authors = [
								...$resource.authors,
								{ name: '', npub: '', id: generateShortId() }
							])}
						class="btn-sm btn-circle btn">+</label
					>
				</div>
				{#each $resource.authors as author}
					<Author {author} />
				{/each}
			</div>
			<div class="mt-4">
				<label>Info about you</label>
				<MdContributor mdContributor={$resource.metadataContributor} />
			</div>
			<div class="mt-4">
				{#if !enablePublish}
					<div
						class="tooltip"
						data-tip="You must provide at least a valid URL and name"
					>
						<button
							class="btn-disabled btn-primary btn m-2 block"
							type="submit">Publish</button
						>
					</div>
				{:else}
					<div>
						<button class="btn" type="submit">PUBLISH</button>
					</div>
				{/if}
			</div>
		</form>
	{:else}
		<div class="flex flex-col">
			<h1 class="m-auto">Published!</h1>
			<p class="m-auto">Your resource was published to the following bots:</p>
			<ul>
				{#if events.length > 0}
					{#each events as event}
						<li class="ml-4 list-disc">
							<a
								href="https://iris.to/{genNpub(event.pubkey)}"
								target="_blank"
							>
								{bots.find((b) => b.pk === event.pubkey)?.title ||
									'Bitcoin Library'}</a
							>
						</li>
					{/each}
				{/if}
			</ul>
			<p>
				Don't see any content or meaningful name when following the links? Add <code
					>nostr.btc-library.com</code
				> to your relays!
			</p>
			<label on:click={() => ($published = !$published)} for="" class="btn"
				>Add another one!</label
			>
		</div>
	{/if}
</div>
