<template>
  <b-row>
    <b-col lg="6" class="my-1">
      <b-form-group
        v-slot="{ ariaDescribedby }"
        label="Sort"
        label-for="sort-by-select"
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        class="mb-0"
      >
        <b-input-group size="sm">
          <b-form-select
            id="sort-by-select"
            v-model="sortBy"
            :options="sortOptions"
            :aria-describedby="ariaDescribedby"
            class="w-75"
          >
            <template #first>
              <option value="">-- none --</option>
            </template>
          </b-form-select>

          <b-form-select
            v-model="sortDesc"
            :disabled="!sortBy"
            :aria-describedby="ariaDescribedby"
            size="sm"
            class="w-25"
          >
            <option :value="false">Asc</option>
            <option :value="true">Desc</option>
          </b-form-select>
        </b-input-group>
      </b-form-group>
    </b-col>

    <b-col lg="6" class="my-1">
      <b-form-group
        label="Initial sort"
        label-for="initial-sort-select"
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        class="mb-0"
      >
        <b-form-select
          id="initial-sort-select"
          v-model="sortDirection"
          :options="['asc', 'desc', 'last']"
          size="sm"
        ></b-form-select>
      </b-form-group>
    </b-col>

    <b-col lg="6" class="my-1">
      <b-form-group
        label="Filter"
        label-for="filter-input"
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        class="mb-0"
      >
        <b-input-group size="sm">
          <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="Type to Search"
          ></b-form-input>

          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-col>

    <b-col lg="6" class="my-1">
      <b-form-group
        v-slot="{ ariaDescribedby }"
        v-model="sortDirection"
        label="Filter On"
        description="Leave all unchecked to filter on all data"
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        class="mb-0"
      >
        <b-form-checkbox-group
          v-model="filterOn"
          :aria-describedby="ariaDescribedby"
          class="mt-1"
        >
          <b-form-checkbox value="name">Name</b-form-checkbox>
          <b-form-checkbox value="age">Age</b-form-checkbox>
          <b-form-checkbox value="isActive">Active</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
    </b-col>

    <b-col sm="5" md="6" class="my-1">
      <b-form-group
        label="Per page"
        label-for="per-page-select"
        label-cols-sm="6"
        label-cols-md="4"
        label-cols-lg="3"
        label-align-sm="right"
        label-size="sm"
        class="mb-0"
      >
        <b-form-select
          id="per-page-select"
          v-model="perPage"
          :options="pageOptions"
          size="sm"
        ></b-form-select>
      </b-form-group>
    </b-col>

    <b-col sm="7" md="6" class="my-1">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="my-0"
      ></b-pagination>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: { fields: { type: Array, default: null } },
  data() {
    return {
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: 'Show a lot' }],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key }
        })
    },
  },
}
</script>

<style>
</style>