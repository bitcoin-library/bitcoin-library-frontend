<script>
	import { user } from '$lib/stores';
	import Lists from '$lib/User/Lists.svelte';
</script>

<div
	class="no-scrollbar sticky top-0 mx-2 flex h-screen w-full flex-col overflow-auto"
>
	<Lists lists={$user.lists} />
</div>
