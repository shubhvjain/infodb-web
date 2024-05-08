<!-- this is the route page to add a new a record  -->
<script>
	import Header from "./Header.svelte";
	import AddRecord from "../Actions/addRecord.svelte";
	export let db_name 

</script>

<Header page="db-home" db_name={db_name}/>
<AddRecord db_name={db_name}/>