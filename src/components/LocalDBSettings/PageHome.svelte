
<script>
  import { onMount } from "svelte";
  import Header from "../header.svelte";
  // import UIEditor from "../UIEditor.svelte"
  import List from "./ListDB.svelte";
  onMount(async()=>{
    const dbConn = await import("$lib/client/localDB")
    let a1 = new dbConn.db("sample3")
    await a1.log({test:"yehhh!"})
  })
  
</script>
  <Header/>
  <List/>
  <!-- <UIEditor/> -->


  