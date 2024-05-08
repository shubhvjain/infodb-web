
<!-- this component is displayed on the first page of the app i.e the base url.
this page shows multiple things :
- hearer 
- list of currently available LDBs.
 the option to add new LDB is in the list container 

-->
<script>
  import Header from "./Header.svelte";
  import ListLDB from "../Actions/listLDB.svelte"
</script>
<Header/>
<ListLDB/>  