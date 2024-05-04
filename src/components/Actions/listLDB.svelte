<!-- to display a list of available ldbs and add new one -->
<script>
	import { onMount } from 'svelte';
  import AddDB from './AddDB.svelte'
  import EditDB from './EditDB.svelte'
  import EditorUI from '../Editor/EditorUI.svelte';
	import DBEditor from '../Editor/DBEditor.svelte';
  //import 
  let dbs = []
  onMount(async ()=>{
    const dbMod = await import("$lib/client/localDBSettings")
    let dbm = new dbMod.DatabaseManager()
    //console.log()
    dbs = dbm.getAllDatabases()
  })
  // dbs =  [
  //   {
  //     name:"sample1",
  //     note: "This is a just a simple test server.",
  //     created: "some date",
  //     lastSynced:"some date",
  //     remoteUrl:"some url"
  //   },
  //   {
  //     name:"sample2",
  //     note: "This is a just a simple test server.",
  //     created: "some date",
  //     lastSynced:"some date",
  //     remoteUrl:"some url"
  //   },
  //   {
  //     name:"sample3",
  //     note: "This is a just a simple test server.",
  //     created: "some date",
  //     lastSynced:"some date",
  //     remoteUrl:"some url"
  //   }
  //  ]
  let toggleState = (b)=>{
    //console.log(b)
    toggle[b] = !toggle[b]
    //console.log(toggle)
  }
  let toggle = {
    edit : false,
    add : false
  }
  let selectedEditId = undefined
  let loadToEdit = (name)=>{
    selectedEditId = name
    toggle.edit = true
  }
  let handleSaved = (event)=>{
    console.log("relaod the db list maybe??? or update the db")
  }
  let handleAddedNew = (event)=>{
    console.log("new added")
    toggle.add = false
  }
  let sampleData = {"name":"svj"}
</script>
<div class="row p-1">
    <!-- <pre>{JSON.stringify(sampleData,null,2)}</pre> -->
  <!-- <EditorUI mode="view" bind:data={sampleData} /> -->
  <!-- <DBEditor id="new" db_name="sampledb4"/> -->

    <h4>LocalDBs on  device </h4>
    <div class="row row-cols-1 row-cols-md-4 g-3">
      
      

      {#each dbs as db}
      
      <div class="col">
        <div class="card h-100">
         
          <div class="card-body">
            <h5 class="card-title">{db.name}  <button type="button" class="btn btn-link" disabled={toggle.edit} on:click={()=>loadToEdit(db.name)} >Edit</button> <button type="button" disabled={toggle.edit}  class="btn btn-link">View</button> </h5>
            <p class="card-text">{db.note}</p>
          </div>
          <div class="card-footer">
            <small class="text-body-secondary">Last synced on  {db.lastSynced}</small> 
          </div>
        </div>
      </div>

      {/each}

      <div class="col">
        <div class="card h-100">
          <div class="card-body text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
            <p class="card-text">
              <button class="btn btn-link" disabled={toggle.add} on:click={()=>toggleState('add')} >Add new </button>
              
            </p>
          </div>
          
        </div>
      </div>
    </div>

    
  </div>


{#if toggle.edit }
  <div class="row row-cols-1 row-cols-md-12 g-3 mt-2 p-2">
    <div class="col">
      <div class="card">
        
        <div class="card-body">
          <div class="card-title border-bottom">
            <div class="d-flex">
              <div class="p-2 flex-grow-1"> <h5 class="">Edit  </h5></div>
              <!-- <div class="p-2">Save</div> -->
              <div class="p-2">  <button class="btn btn-link" on:click={()=>{toggleState('edit')}} >Close</button>  </div>
            </div>
          </div>
          <EditDB dbname = {selectedEditId} on:saveSuccessfully= {handleSaved}/>
        
          
        </div>
        
      </div>
    </div>
  </div>
{/if}


{#if toggle.add }
  <div class="row row-cols-1 row-cols-md-12 g-3 mt-2 p-2">
    <div class="col">
      <div class="card">
        
        <div class="card-body">
          <div class="card-title border-bottom">
            <div class="d-flex">
              <div class="p-2 flex-grow-1"> <h5 class="">New InfoDB </h5></div>
              <!-- <div class="p-2">Save</div> -->
              <div class="p-2"><button class="btn btn-link" on:click={()=>toggleState('add')}>Close </button></div>
            </div>
          </div>
          <AddDB/>
        
          
        </div>
        
      </div>
    </div>
  </div>
{/if}
