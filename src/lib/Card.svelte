<script>
    import CardModal from "$lib/CardModal.svelte"
	export let item;
	let modalOpen = false
	function toggleModal() {
		modalOpen = !modalOpen
	}
	console.log(item)
</script>

<div class="card bg-base-100 shadow-xl m-4">
	<CardModal item={item} bind:modalOpen/>
	<figure><img src={item.image} alt="Here could be your iamge" /></figure>
	<div class="card-body">
		<div class="badge badge-secondary">NEW</div>
		<h2 class="card-title">
			{item.title}
		</h2>
		<p>{item.description}</p>
		<div class="card-actions justify-end">
			<div class="badge badge-outline">foo</div>
			<div class="badge badge-outline">bar</div>
		</div>
		<label on:click={toggleModal} class="btn" for={item.url}>Show Details</label>
	</div>
</div>
