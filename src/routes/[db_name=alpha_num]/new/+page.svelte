<!-- this is to add a new records in the db -->
<script>
  export let data
  import NewRecord from "../../../components/Page/NewRecord.svelte"
</script>
<NewRecord db_name={data["db_name"]}/>
