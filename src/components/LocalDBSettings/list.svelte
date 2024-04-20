<!-- to display a list of available ldbs and add new one -->
<script>
  let dbs =  [
    {
      name:"sample1",
      note: "This is a just a simple test server.",
      created: "some date",
      lastSynced:"some date",
      remoteUrl:"some url"
    }
   ]
</script>

<div class="row mt-2 p-2">
    

    <h4>Local Databases on  device </h4>
    <div class="row row-cols-1 row-cols-md-4 g-2">
      
      

      {#each dbs as db}
      
      <div class="col">
        <div class="card h-100">
         
          <div class="card-body">
            <h5 class="card-title">{db.name}  <button type="button" class="btn btn-link">Edit</button> <button type="button" class="btn btn-link">View</button> </h5>
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
              Add new
            </p>
          </div>
          
        </div>
      </div>
    </div>

    
  </div>

