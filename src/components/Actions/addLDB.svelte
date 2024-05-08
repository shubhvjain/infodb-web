<!-- to create and configure a new LDB -->
<script>
	import { onMount } from 'svelte';
  import EditorUI from "../Editor/EditorUI.svelte"
  import ShowMsg from './showMsg.svelte';
  let new_db_schema = {
    "type":"object",
    "title":"New LocalDataBase",
    "properties":{
      "name":{
        "type":"string",
        "minLength":5,
        "maxLength":50
      },
      "remoteURL":{
        "type":"string",
        "format":"url",
        "description":"Remote CouchDB URL (for Syncing, optional)"
      },
      "note":{
        "type":"string",
      }
    },
    "required":["name"]
  }
  let new_data 
  let dbm 

  onMount(async ()=>{ 
     let dbMod = await import("$lib/client/localDBSettings")
     dbm = new dbMod.DatabaseManager()
    //dbs = dbm.getAllDatabases()
  })
  let msg = ""
  let msg_type = "danger"
  const addNewLDB=()=>{
    if(new_data){
      try {
        let name = new_data["name"]
        console.log(new_data)
        dbm.addDatabase(name,new_data)
        msg="New Database added"
        msg_type = "success"  
      } catch (error) {
        msg=error.message
        msg_type = "danger" 
      }
      
    }else{
      msg="Unable to add new database, error in input data"
      msg_type = "danger"
    }
  }
</script>
<div class="row">
  <div class="col-12">
    <EditorUI  mode="new" bind:data={new_data} schema={new_db_schema}></EditorUI>
    <ShowMsg bind:message={msg} bind:type={msg_type}/>
    <button class="btn btn-primary" on:click={addNewLDB}>+ Add new</button>
  </div>
</div>