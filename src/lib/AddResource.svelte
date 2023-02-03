<div class="form-control w-full max-w-xs">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="label">
		<span class="label-text">Name of Resource</span>
	</label>
	<input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />

	<label class="label">
		<span class="label-text">Description of Resource</span>
	</label>
	<textarea class="textarea textarea-bordered" placeholder="Type here" />

    <label for="" class="label">
        <span>Language: </span>
    </label>
	<select class="select select-bordered w-full max-w-xs">
		<option disabled selected>Language</option>
		<option>de</option>
		<option>en</option>
	</select>

    <button class="btn my-2">Add Resource</button>
</div>
