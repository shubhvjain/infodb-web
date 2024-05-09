<!-- to edit a selected LDB settings
this is multipurpose, can be called from inside the db page are well as the home page where all dbs are listed out
-->

<script>
  export let db_name 
  import ShowMsg from "./showMsg.svelte"
  let msg_type="danger"
  let msg=""
  const showMsg = (typ,msg1)=>{
    msg_type = typ
    msg = msg1
  }
</script>
<ShowMsg bind:type={msg_type} bind:message={msg} />
<details open>
  <summary>Edit settings</summary>
</details>
<details open>
  <summary>Schema</summary>
</details>