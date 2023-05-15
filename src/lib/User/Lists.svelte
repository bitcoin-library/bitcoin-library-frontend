<script>
	export let lists;

	import { sortListOfObjects } from '$lib/utils.js';

	$: console.log(lists);
</script>

{#each sortListOfObjects(lists) as list}
	<div class="rounded border border-solid border-white p-2">
		<p class="text-xl font-bold">
			#
			<span class="underline">
				{list.tags.find((l) => l[0] === 'd')[1]}
			</span>
		</p>
		{#each list.tags.filter((l) => l[0] !== 'd') as tag}
			<div class="m-2 rounded border border-solid border-white p-2">
				<p>{tag[1]}</p>
			</div>
		{/each}
	</div>
{/each}
