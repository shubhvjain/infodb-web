
<!-- this component is displayed on the first page of the app i.e the base url.
this page shows multiple things :
- hearer 
- list of currently available LDBs.
 the option to add new LDB is in the list container 

-->

<script>
  import { onMount } from "svelte";
  import Header from "./Header.svelte";
  // import UIEditor from "../UIEditor.svelte"
  import ListLDB from "../Actions/listLDB.svelte"
  // import List from "../LocalDBSettings/ListDB.svelte";
  onMount(async()=>{
    // const dbConn = await import("$lib/client/localDB")
    // let a1 = new dbConn.db("sample3")
    //await a1.log({test:"reloaded!"})
    // await a1.initialize_db()
    //let b = await a1.get_setting_doc("tags")

    //let d = await a1.get_setting_doc("web_settings")
    //console.log(d)

    //let e = await a1.get_setting_doc("web_settings_bla_bal")
    //console.log(e)

  })
  
</script>
  <Header/>
  <ListLDB/>
  <!-- <UIEditor/> -->


  