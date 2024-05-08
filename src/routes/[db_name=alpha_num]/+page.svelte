<script>
  export let data
  import HomeDB from "../../components/Page/HomeDB.svelte"
</script>
<HomeDB db_name={data["db_name"]} />