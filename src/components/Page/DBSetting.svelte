<!-- this page is to show settings for selected LDB  -->


<script>
  import Header from "./Header.svelte";
  import EditLDBSettings from "../Actions/editLDBSettings.svelte"
  export let db_name 
</script>
<Header page="db-home" db_name="{db_name}"/>
<EditLDBSettings db_name={db_name}/>
