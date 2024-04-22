
<script>
  import { onMount } from "svelte";
  import Header from "../header.svelte";
  // import UIEditor from "../UIEditor.svelte"
  import List from "./ListDB.svelte";
  onMount(async()=>{
    const dbConn = await import("$lib/client/localDB")
    let a1 = new dbConn.db("sample3")
    //await a1.log({test:"reloaded!"})
    //await a1.initialize_db()
    //let b = await a1.get_setting_doc("tags")

    //let d = await a1.get_setting_doc("web_settings")
    //console.log(d)

    //let e = await a1.get_setting_doc("web_settings_bla_bal")
    //console.log(e)

  })
  
</script>
  <Header/>
  <List/>
  <!-- <UIEditor/> -->


  