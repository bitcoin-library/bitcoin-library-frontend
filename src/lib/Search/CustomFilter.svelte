<script>
	import { filters, searchTerm } from '$lib/stores/search.js';
	import { checkSquare, chevronDown } from 'svelte-awesome/icons'; // alternative, more efficient import
	import Icon from 'svelte-awesome';
	import { submitSearch } from '$lib/meili/submitSearch';

	export let property;
	export let activeFilter;

	$: activeFilter = property.attributes.some((e) => e.checked === true);
</script>

<div class="dropdown">
	<label class="btn flex flex-row gap-2" tabindex="0">
		<span class="">{property.name}</span>
		<div class="" class:invisible={!activeFilter}>
			<Icon style="color: orange" data={checkSquare} />
		</div>
		<Icon data={chevronDown} />
	</label>
	<div
		tabindex="0"
		class="card dropdown-content card-compact w-64 bg-primary p-2 text-primary-content shadow"
	>
		<div class="form-control">
			{#each property.attributes as attribute}
				<!-- TODO handle click wieder einfügen -->
				<label
					on:click={() => filters.toggleFilter(property.id, attribute)}
					on:click={() => submitSearch()}
					class="label cursor-pointer hover:bg-violet-600"
				>
					<span class="label-text px-2">{attribute.value}</span>
					{#if attribute.checked}
						<Icon style="color:orange" data={checkSquare} />
					{:else}
						<Icon style="color:grey" data={checkSquare} />
					{/if}
				</label>
			{/each}
			<div>
				<button
					class="btn"
					on:click={() => {
						filters.reset(property.id);
					}}
					on:click={() => submitSearch()}>Reset</button
				>
			</div>
		</div>
	</div>
</div>
