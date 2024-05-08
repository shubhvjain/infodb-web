<!-- this is the route page to search records in the selected DB --><!-- this is the route page to add a new a record  -->
<script>
	import Header from "./Header.svelte";
	import SearchRecord from "../Actions/searchRecord.svelte";
  export let db_name 
</script>

<Header page="db-home" db_name={db_name}/>
<SearchRecord  db_name={db_name}/>
