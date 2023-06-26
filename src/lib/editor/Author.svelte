<script>
	import { resource } from '$lib/stores/editor.js';

	export let author;

	function removeAuthor() {
		$resource.authors = $resource.authors.filter((a) => a.id !== author.id);
	}
</script>

<div class="ml-2 mt-4 flex flex-row items-center p-2">
	<div>
		<label class="label">Name</label>
		<input bind:value={author.name} class="input-bordered input" type="text" />

		<label class="label">npub</label>
		<input bind:value={author.npub} class="input-bordered input" type="text" />
	</div>
	<label on:click={removeAuthor} class="btn-error btn-sm btn-circle btn ml-5"
		>X</label
	>
</div>
