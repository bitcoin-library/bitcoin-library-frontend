<script>
  import { filters} from "$lib/stores"

  let checked

  $: checked = $filters.map(f => f.attributes.filter(a => a.checked))
  $: console.log(checked)
</script>

{#each $filters as filter}
  {#each filter.attributes as attribute}
    {#if attribute.checked === true}
    <div on:click={() => console.log("clicked me")} class=" cursor-pointer badge badge-warning gap-2">
      <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      {attribute.label}
    </div>
    {/if}
  {/each}
{/each} 