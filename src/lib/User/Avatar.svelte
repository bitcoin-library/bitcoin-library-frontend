<script>
	import { openDetailbar, user, selectedCard } from '$lib/stores.js';
</script>

<div class="avatar">
	<div
		on:click={() => {
			if ($openDetailbar === true && Object.keys($selectedCard).length) {
				selectedCard.set({});
				user.update((u) => ({ ...u, showDetails: true }));
			} else if (
				$openDetailbar === true &&
				!Object.keys($selectedCard).length
			) {
				$openDetailbar = false;
				user.update((u) => ({ ...u, showDetails: false }));
			} else {
				$openDetailbar = true;
				user.update((u) => ({ ...u, showDetails: true }));
			}
		}}
		class="cursor-pointer rounded-full"
	>
		<img src={$user?.profile?.image} />
	</div>
</div>
