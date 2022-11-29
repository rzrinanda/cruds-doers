<template>
  <div>
    <TableControls />
    <DataTables />
  </div>
</template>

<script>
import DataTables from './DataTables.vue'
import TableControls from './TableControls.vue'
export default {
  components: { DataTables, TableControls },
}
</script>

<style>
</style>