<script>
	/** @type {import('./$types').PageData} */
	// data has event which is the list and resources that are the lists events
	export let data;

	import Lists from '$lib/User/Lists.svelte';
	import { user } from '$lib/stores';
	import { get } from 'svelte/store';

	$: console.log(data);
</script>

<!-- add title of list  -->

<a href="/" class="text-xl font-bold">Bitcoin-Library</a>
<div class="mx-auto w-1/2">
	<!-- <Lists lists={$user.lists} selectedListIDs={[data.list.id]} /> -->
	<Lists lists={[data.list]} />
</div>
