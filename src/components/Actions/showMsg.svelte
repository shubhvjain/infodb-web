<script>
  export let message = ''; 
  export let type = '';
  // Function to close the alert
  function closeAlert() {
    message = ''; // Reset the alert message
  }
</script>

{#if message}
  <div class="alert alert-{type}">
    {message}
    <br>
    <button class="btn btn-sm  m-1" on:click={closeAlert}>Close</button>
  </div>
{/if}