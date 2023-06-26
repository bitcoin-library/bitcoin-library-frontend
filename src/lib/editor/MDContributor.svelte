<script>
	export let mdContributor;
</script>

<div class="ml-2 mt-4 flex flex-row items-center p-2">
	<div>
		<label class="label">Name</label>
		<input
			bind:value={mdContributor.name}
			class="input-bordered input"
			type="text"
		/>

		<label class="label">npub</label>
		<input
			bind:value={mdContributor.npub}
			class="input-bordered input"
			type="text"
		/>
	</div>
</div>
