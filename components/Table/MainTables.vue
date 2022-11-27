<template>
  <div>
    <TableOptions />
    <DataTables />
  </div>
</template>

<script>
import DataTables from './DataTables.vue'
import TableOptions from './TableOptions.vue'
export default {
  components: { DataTables, TableOptions },
}
</script>

<style>
</style>