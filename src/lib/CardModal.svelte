<script>
    export let modalOpen;
    export let item;

</script>

<input type="checkbox" id={item.url} class="modal-toggle" class:modal-open={modalOpen} />
<label for={item.url} class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-lg font-bold">{item.title}</h3>
    <p class="py-4">{item.description}</p>
  </label>
</label>