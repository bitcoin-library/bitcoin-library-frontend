<script>
	let expanded = false;
	export const property = {
		name: 'Languages    ',
		attributes: [
			{ id: 0, value: 'de', checked: true },
			{ id: 1, value: 'en', checked: true }
		]
	};

	$: console.log(property.attributes);
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
	<input type="checkbox" />
	<div class="collapse-title font-medium">{property.name}</div>
	<div class="collapse-content">
		{#each property.attributes as attribute}
			<label class="label cursor-pointer justify-start">
				<input
					type="checkbox"
					checked={attribute.checked}
					on:click={() => (attribute.checked = !attribute.checked)}
					class="checkbox checkbox-sm"
				/>
				<span class="label-text px-2">{attribute.value}</span>
			</label>
		{/each}
	</div>
</div>
