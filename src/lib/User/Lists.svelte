<script>
	export let lists;

	import { sortListOfObjects } from '$lib/utils.js';
	import { removeList } from '$lib/nostr/removeList.js';
	import { removeItemFromList } from '$lib/nostr/removeItemFromList.js';

	$: console.log(lists);
</script>

{#each sortListOfObjects(lists) as list}
	<div class="rounded border border-solid border-white p-2">
		<div class="flex flex-row">
			<p class="text-xl font-bold">
				#
				<span class="underline">
					{list.tags.find((l) => l[0] === 'd')[1]}
				</span>
			</p>
			<button
				on:click={removeList(list.id)}
				class="btn-sm btn-circle btn ml-auto mr-1 bg-red-500"
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
		</div>
		{#each list.tags as tag, index}
			<!-- We want to skip the name of the list provided by the d tag -->
			{#if tag[0] === 'd'}{:else}
				<div
					class="m-2 flex flex-row rounded border border-solid border-white p-2"
				>
					<div class="w-48">
						<p class="truncate">{tag[1]}</p>
					</div>
					<button
						on:click={removeItemFromList(list, index)}
						class="btn-sm btn-circle btn ml-auto mr-1 bg-red-500"
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
				</div>
			{/if}
		{/each}
	</div>
{/each}
