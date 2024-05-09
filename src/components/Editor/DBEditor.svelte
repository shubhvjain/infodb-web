<script>
	import { onMount } from 'svelte';
	import EditorUI from '../Editor/EditorUI.svelte';
	export let id = 'new';
	export let db_name;
	let mode = 'new';
	let doc = {}
	let data_schema;
	let selected_schema;
	// let schema_list
	let db_settings;
	let dbc;
  
  let loaded = {
    page: false,
    data_editor : false,
    meta_editor: false
  }

  const loadNewEditor = async (schemaName)=>{
    // db_settings = await dbc.load_editor_settings()
    console.log(db_settings)
    selected_schema = schemaName
    let s = db_settings["schemas"].find(item=>{return item["data"]["name"]==schemaName})
    data_schema = s
    console.log(data_schema)
    loaded.data_editor = true

  }

	const loadEditor = async () => {
		if (!db_name) {
			throw new Error('Database name not provided');
		}
		if (id != 'new') {
			// load_editor_settings
      
		} else {
			// load a new record added
			db_settings = await dbc.load_editor_settings();
      //let a = await dbc.db.allDocs({ include_docs: true });
      loaded.page = true
      // console.log(db_settings)
		}
    
	};
	onMount(async () => {
		const dbConn = await import('$lib/client/localDB');
		dbc = new dbConn.db(db_name);
    //dbc.initialize_db()
		await loadEditor();
});
const changeNewSchema = async(event)=>{
  console.log(event.target.value)
  let new_value = event.target.value
  if(new_value!=""){
    await loadNewEditor(new_value)
  }
}
</script>
{#if loaded.page}
<div class="row">
  <div class="col-lg-12 mx-auto">


    {#if mode=='new'}
      <div class="card1 border-bottom mb-1">
        <div class="card-body1 p-0">
          <div class="d-flex">
            <div class="p-2 flex-grow-1"><h4>Add a new document</h4></div>
            <div class="p-2">
              <select class="form-control form-control-sm" on:change={changeNewSchema}>
                  <option value="">Select schema</option>
                {#each db_settings["schemas"] as option}
                  <option value={option["data"]["name"]}>{option["data"]["name"]}</option>
                {/each}
              </select>

            </div>
            <div class="p-2">
              <button class="btn btn-sm btn-success">+ Add</button>
            </div>
          </div>
        </div>
      </div>
    {/if}


    <!-- <div><pre>{JSON.stringify(doc,null,2)}</pre></div> -->

    {#if loaded.data_editor}
    <details open>
      <summary>Data</summary>
      <EditorUI mode="new" schema={data_schema["data"]["schema"]} bind:data={doc} />
    </details>
    {/if}


    {#if loaded.meta_editor}
    <details>
      <summary>Metadata</summary>
      <EditorUI mode="new" schema={data_schema["data"]["schema"]} bind:data={doc} />
    </details>
    {/if}



  </div>
</div>
{/if}