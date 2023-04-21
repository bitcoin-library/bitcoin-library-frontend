<script>
	export let properties = [];

	// calculate proportion of total events that set this attribute
	function calcProportion(arr, item) {
		// sort an array of objects by the lenght of their 'addedByEvent' array
		arr.sort((a, b) => b.addedByEvent.length - a.addedByEvent.length);
		const proportion = Math.round(
			(item.addedByEvent.length / arr[0].addedByEvent.length) * 100
		);
		return proportion;
	}
	$: longestArray = properties[0]?.addedByEvent && properties.sort(
		(a, b) => b.addedByEvent.length - a.addedByEvent.length
	)[0].addedByEvent;
</script>

<div>
	{#each properties as prop}
		<div class="tooltip" data-tip="Selected {prop.addedByEvent.length} out of {longestArray.length} times.">
			<span style="opacity: {calcProportion(
				properties,
				prop
			)}%;"
				class="badge-warning badge m-1">{prop.title}</span
			>
		</div>
	{/each}
</div>
