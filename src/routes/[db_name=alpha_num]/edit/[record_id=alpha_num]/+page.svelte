<script>
  export let data
  import EditRecord from "../../../../components/Page/EditRecord.svelte"
</script>
<EditRecord  record_id={data["record_id"]} db_name={data["db_name"]} />
