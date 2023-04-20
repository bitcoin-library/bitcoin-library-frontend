<script>
	export let properties = [];

	// calculate proportion of total events that set this attribute
	function calcProportion(arr, item) {
		// sort an array of objects by the lenght of their 'addedByEvent' array
		arr.sort((a, b) => b.addedByEvent.length - a.addedByEvent.length);
		const proportion = Math.round(
			(item.addedByEvent.length / arr[0].addedByEvent.length) * 100
		);
		const opacity = `opacity-[.${proportion - 1}]`;
		console.log(opacity);
		// return `opacity-[.${proportion}]`;
		return opacity;
	}
	$: console.log(properties);
	$: longestArray = properties[0]?.addedByEvent && properties.sort(
		(a, b) => b.addedByEvent.length - a.addedByEvent.length
	)[0].addedByEvent;
</script>

{#each properties as prop}
	<div class="tooltip" data-tip="This prop was selected {prop.addedByEvent.length} out of {longestArray.length} times.">
		<span
			class="badge-warning badge m-1 {calcProportion(
				properties,
				prop
			)}">{prop.title}</span
		>
	</div>
{/each}
