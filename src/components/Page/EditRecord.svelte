<!-- this is the route page to edit a record  -->

<script>
  import Header from "./Header.svelte";
  import EditRecord from "../Actions/editRecord.svelte"
  export let db_name 
  export let record_id 

</script>
<Header page="db-home" db_name="{db_name}"/>
<EditRecord db_name={db_name} record_id={record_id} />