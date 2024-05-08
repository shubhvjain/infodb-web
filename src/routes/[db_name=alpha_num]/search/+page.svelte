<!-- to search records in the LDB -->

<script>
  export let data ;
  import SearchRecord from "../../../components/Page/SearchRecord.svelte";

</script>
<SearchRecord db_name={data["db_name"]} />
