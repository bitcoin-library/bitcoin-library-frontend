<script>
  	import {
		openDetailbar,
		selectedCard
	} from '../lib/stores';

  export let item;

  $: console.log(item)
</script>

<div class="fixed">
  <button
						class="btn"
						on:click={() => selectedCard.set({})}
						on:click={() => ($openDetailbar = false)}>Close</button
					>
  <img src="{item.image}" alt="">
  <h2>{item.name}</h2>

</div>