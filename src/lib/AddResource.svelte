<script>
	import { searchResults, totalHits, resultsPerPage } from '../lib/stores';

	/**
	 * @param {{ target: HTMLFormElement | undefined; }} e
	 */
	async function onSubmit(e) {
		const formData = new FormData(e.target);
		console.log(formData);
		await addData(formData);
	}
	/**
	 * @param {FormData} formData FormData
	 */
	async function addData(formData) {
		const res = await fetch('/api/mongo/insert', {
			method: 'POST',
			body: formData
		});
		console.log(res);

		// TODO this has to be refactored, maybe together with the call in +page.js
		const data = await (
			await fetch('/api/elastic/search_all', {
				method: 'POST',
				body: JSON.stringify({ size: $resultsPerPage })
			})
		).json();
		searchResults.set(data.hits.hits);
		$totalHits = data.hits.total.value;
	}
</script>

<div class="form-control w-full max-w-xs">
	<form on:submit|preventDefault={onSubmit}>
		<label for="name" class="label">
			<span class="label-text">Name of Resource</span>
		</label>
		<!-- TODO change to name -->
		<input
			type="text"
			id="name"
			name="title"
			placeholder="Type here"
			class="input input-bordered w-full max-w-xs"
		/>

		<label for="description" class="label">
			<span class="label-text">Description of Resource</span>
		</label>
		<textarea
			id="description"
			name="description"
			class="textarea textarea-bordered"
			placeholder="Type here"
		/>

		<label for="language" class="label">
			<span>Language: </span>
		</label>
		<select id="langauge" name="language" class="select select-bordered w-full max-w-xs">
			<option disabled selected>Language</option>
			<option value="de_DE">de</option>
			<option>en</option>
		</select>

		<button class="btn my-2" type="submit">Add Resource</button>
	</form>
</div>
