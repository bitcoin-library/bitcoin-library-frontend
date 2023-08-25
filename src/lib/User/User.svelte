<script>
	import { user } from '$lib/stores';
	import Lists from '$lib/User/Lists.svelte';
</script>

<Lists lists={$user.lists} />
