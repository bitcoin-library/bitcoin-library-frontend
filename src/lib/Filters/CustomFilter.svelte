<script>
	import {
		filters
	} from '$lib/stores';
	// import { buildBody } from '$lib/elastic/helper';
	import { checkSquare, chevronDown } from 'svelte-awesome/icons'; // alternative, more efficient import
	import Icon from 'svelte-awesome';

	export let property;
	export let activeFilter;

	async function handleClick() {
		// const body = buildBody($searchTerm, $resultsPerPage, $pagination.current, $filters);
		// const res = await fetch('/api/elastic/search', body);
		// const result = await res.json();
		// console.log(result);
		// result?.hits && searchResults.set(result.hits.hits);
		// $totalHits = result.hits.total.value;
	}

	$: activeFilter = property.attributes.some((e) => e.checked === true);
</script>

<div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="dropdown">
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="btn m-1" tabindex="0">
			<span class="px-4">{property.name}</span>
			<div class="px-2" class:invisible={!activeFilter}>
				<Icon style="color: orange" data={checkSquare} />
			</div>
			<Icon data={chevronDown} />
		</label>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div
			tabindex="0"
			class="dropdown-content card card-compact w-64 p-2 shadow bg-primary text-primary-content"
		>
			<div class="form-control">
				{#each property.attributes as attribute}
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<!-- TODO handle click wieder einfügen -->
					<label
						on:click={() => filters.toggleFilter(property.id, attribute)}
					
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
						on:click={() => handleClick()}>Reset</button
					>
				</div>
			</div>
		</div>
	</div>
</div>
