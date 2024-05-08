<!-- to view all settings -->
<script>
  export let data;
  import DbSetting from "../../../components/Page/DBSetting.svelte";
</script>
<DbSetting db_name={data["db_name"]} />