<!-- to edit settings of a database. including setting in the database  -->
<script>
	import { onMount } from "svelte";
  // Importing createEventDispatcher from Svelte
  import { createEventDispatcher } from 'svelte';

  // Creating an event dispatcher
  const dispatch = createEventDispatcher();

  // Function to send the message to the parent component
  function sendMessage() {
    // Dispatching a custom event named "message" with some data
    dispatch('saveSuccessfully', { text: 'Hello from Child' });
  }

  export let dbname ;
  onMount(()=>{
    if(!dbname){
      throw Error("No DB name selected")
    }
  })
  

</script>

party... {dbname}