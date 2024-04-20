<script>
	import { onMount } from 'svelte';
  export const schema = undefined
  export const options = {}
  export const data = undefined

  let theEditor 
  let theError = undefined;
  let displayEditor = async ()=>{
    const { JSONEditor } = await import('@json-editor/json-editor');
		const element = document.getElementById('this-is-my-form');
    if(!schema){
      displayError("No schema provided")
      throw new Error("No schema provided")
    }
		const editorOptions = { 
      ... options ,
			theme: 'bootstrap4',
			schema: schema
		};
		const editor = new JSONEditor(element, options);
  }
  let displayError = (msg)  => {
    theError = msg
  }
  let clearError = () => {
    theError = undefined
  }

	onMount(async () => {
		try {
      displayEditor()
    } catch (error) {
      //console.log("") TODO fix this not working
      displayError(error.message)
    }
	});
</script>

<div id="this-is-my-form"></div>

{#if theError}
<div class="alert alert-warning" role="alert">
  <b>Error</b> : {theError}
</div>
{/if}