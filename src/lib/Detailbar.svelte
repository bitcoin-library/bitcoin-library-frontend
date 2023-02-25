<script>
  export let item;

  $: console.log(item)
</script>

<div>
  <img src="{item.thumbnail}" alt="">
  <h2>{item.name}</h2>

</div>