<template>
  <div>
    <!-- <b-button size="sm" @click="toggle">
      {{ show ? 'Hide' : 'Show' }} Alert
    </b-button>
    <b-alert v-model="show" class="mt-3" dismissible @dismissed="dismissed">
      Hello {{ name }}!
    </b-alert> -->
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="primary"
      class="shadow mb-3 mx-auto"
    >
      <b-navbar-brand href="#">Doers Management</b-navbar-brand>
    </b-navbar>
    <AlertNotification v-if="show" :notif="notif" />
    <b-container fluid>
      <div class="title-heading">Create Data</div>
      <div class="underline"></div>
      <div>
        <b-form
          v-if="showCreate"
          class="mb-5"
          @submit="onSubmit"
          @reset="onReset"
        >
          <b-row>
            <b-col cols="4" md="4" class="mx-3">
              <b-form-group
                id="input-group-3"
                label="Full Name:"
                label-for="input-3"
              >
                <b-form-input
                  id="input-3"
                  v-model="form.name"
                  placeholder="Enter full name"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="4" md="4"
              ><b-form-group
                id="input-group-2"
                label="Date of Birth:"
                label-for="input-2"
              >
                <b-form-datepicker
                  id="input-2"
                  v-model="form.dob"
                  class="mb-2"
                  placeholder="Choose a date"
                  locale="en-US"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  }"
                  required
                ></b-form-datepicker> </b-form-group
            ></b-col>
          </b-row>
          <b-row>
            <b-col cols="4" md="4" class="mx-3">
              <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  placeholder="Enter email"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="4" md="4">
              <b-form-group
                id="input-group-4"
                label="Gender:"
                label-for="input-4"
              >
                <b-form-select
                  id="input-4"
                  v-model="form.gender"
                  :options="genders"
                  required
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="7">
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-col>
            <b-col>
              <b-overlay
                :show="submitLoad"
                rounded
                opacity="0.6"
                spinner-small
                spinner-variant="primary"
                class="d-inline-block"
              >
                <b-button
                  ref="btnCreateSubmit"
                  type="submit"
                  variant="primary"
                  class="float-right"
                  >Submit</b-button
                >
              </b-overlay>
            </b-col>
          </b-row>
        </b-form>
      </div>
      <div class="title-heading">List Data</div>
      <div class="underline"></div>
      <!-- User Interface controls -->
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
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
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

      <!-- Main table element -->
      <b-table
        id="data-table"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        stacked="md"
        show-empty
        small
        @filtered="onFiltered"
      >
        <template #cell(name)="row">
          {{ row.value.first }} {{ row.value.last }}
        </template>

        <template #cell(actions)="row">
          <b-button
            title="Edit data"
            variant="outline-warning"
            size="sm"
            class="mr-1"
            @click="edit(row.item, row.index, $event.target)"
          >
            Edit
          </b-button>

          <b-button
            :title="(row.detailsShowing ? 'Hide' : 'Show') + ' Details'"
            variant="outline-info"
            size="sm"
            @click="row.toggleDetails"
          >
            {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
          </b-button>
          <b-button
            title="Delete data"
            variant="outline-danger"
            size="sm"
            @click="onDelete($event, row.item.id)"
          >
            Delete
          </b-button>
        </template>

        <template #row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">
                {{ key }}: {{ value }}
              </li>
            </ul>
          </b-card>
        </template>
      </b-table>

      <!-- Info modal -->
      <b-modal
        :id="infoModal.id"
        :title="infoModal.title"
        size="xl"
        body-class="position-static"
        @hidden="onEditReset"
      >
        <!-- <pre>{{ infoModal.content }}</pre> -->
        <b-container fluid>
          <b-row>
            <b-col cols="6" md="6">
              <b-form-group
                id="input-group-3"
                label="Full Name:"
                label-for="input-3"
              >
                <b-form-input
                  id="input-3"
                  v-model="form.name"
                  placeholder="Enter full name"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col
              ><b-form-group
                id="input-group-2"
                label="Date of Birth:"
                label-for="input-2"
              >
                <b-form-datepicker
                  id="input-2"
                  v-model="form.dob"
                  class="mb-2"
                  placeholder="Choose a date"
                  locale="en-US"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  }"
                  required
                ></b-form-datepicker> </b-form-group
            ></b-col>
          </b-row>
          <b-row>
            <b-col cols="6" md="6">
              <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  placeholder="Enter email"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-4"
                label="Gender:"
                label-for="input-4"
              >
                <b-form-select
                  id="input-4"
                  v-model="form.gender"
                  :options="genders"
                  required
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-6"
                label="Active:"
                label-for="input-6"
              >
                <b-form-select
                  id="input-6"
                  v-model="form.isActive"
                  :options="status"
                  value-field="value"
                  text-field="text"
                  required
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>

        <template #modal-footer>
          <div class="w-100">
            <b-button
              ref="btnEditSubmit"
              variant="outline-primary"
              size="sm"
              class="float-right"
              @click="onEditSubmit()"
            >
              Submit
            </b-button>
            <b-button
              variant="outline-danger"
              size="sm"
              class="float-left"
              @click="onEditReset($event)"
            >
              Reset
            </b-button>
          </div>
        </template>
        <b-overlay
          :show="editProcess"
          no-wrap
          rounded="true"
          @shown="onConfirm"
          @hidden="onHidden"
        >
          <template #overlay>
            <div
              v-if="editProcessing"
              class="text-center p-4 bg-transparent text-dark rounded flex"
            >
              <!-- <b-icon icon="cloud-upload" font-scale="4"></b-icon> -->
              <div class="mb-3">Processing...</div>
              <!-- <b-progress
                min="1"
                max="20"
                :value="waiting"
                variant="success"
                height="3px"
                class="mx-n4 rounded-0"
              ></b-progress> -->
            </div>
            <div
              v-else
              ref="confirmDialog"
              tabindex="-1"
              role="dialog"
              aria-modal="false"
              aria-labelledby="form-confirm-label"
              class="text-center p-3"
            >
              <p><strong id="form-confirm-label">Are you sure?</strong></p>
              <div class="d-flex">
                <b-button
                  variant="outline-danger"
                  class="mr-3"
                  @click="onCancel"
                >
                  Cancel
                </b-button>
                <b-button
                  variant="outline-success"
                  @click="onOK($event, infoModal.index)"
                  >OK</b-button
                >
              </div>
            </div>
          </template>
        </b-overlay>
      </b-modal>
    </b-container>
  </div>
</template>
<script>
import AlertNotification from '@/components/AlertNotification.vue'
export default {
  components: {
    AlertNotification,
  },
  props: {},
  async asyncData({ $axios }) {
    const result = await $axios.get('/doers')
    // console.log('data axios', result.data)
    const items = result.data
    return { items }
  },
  data() {
    return {
      name: 'IndexPage',
      show: false,
      notif: {
        show: true,
        color: 'info',
        mode: '',
      },
      submitLoad: false,
      // deleteLoad: false,
      editProcess: false,
      editProcessing: false,
      waiting: 1,
      interval: null,
      form: {
        email: '',
        name: '',
        dob: null,
        age: 0,
        gender: null,
        isActive: true,
      },
      genders: [{ text: 'Select One', value: null }, 'Male', 'Female'],
      status: [
        { value: true, text: 'Yes' },
        { value: false, text: 'No' },
      ],
      showCreate: true,
      fields: [
        {
          key: 'name',
          label: 'Full Name',
          sortable: true,
          sortDirection: 'desc',
        },
        {
          key: 'age',
          label: 'Age',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'isActive',
          label: 'Is Active',
          formatter: (value, key, item) => {
            return value ? 'Yes' : 'No'
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },
        { key: 'actions', label: 'Actions' },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: 'Show a lot' }],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
        index: '',
      },
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
  watch: {
    show(newVal) {
      // console.log('Alert is now ' + (newVal ? 'visible' : 'hidden'))
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
    console.log('DATA', this.items)
  },
  methods: {
    getAge(dateString) {
      const today = new Date()
      const birthDate = new Date(dateString)
      let age = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    },
    edit(item, index, button) {
      // this.infoModal.title = `Row index: ${index}`
      this.infoModal.index = item.id
      this.infoModal.title = `Edit data`
      this.infoModal.content = JSON.stringify(item, null, 2)

      this.form = {
        ...item,
        name: item.name.first + ' ' + item.name.last,
      }
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      console.log('MODAL', this.form, item)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    toggle() {
      // console.log('Toggle button clicked')
      this.show = !this.show
    },
    dismissed() {
      // console.log('Alert dismissed')
    },
    async onSubmit(event) {
      console.log('ON SUBMIT')
      event.preventDefault()
      const age = this.getAge(this.form.dob)
      this.form.age = age
      const firstName = this.form.name.split(' ')[0]
      const lastName = this.form.name.split(' ').pop()
      this.submitLoad = true
      const req = {
        email: this.form.email,
        name: { first: firstName, last: lastName },
        age: this.form.age,
        gender: this.form.gender,
        dob: this.form.dob,
        isActive: true,
      }
      // alert(JSON.stringify(req))
      this.show = false
      const res = await this.$axios.post('/doers', req)
      if (res.data) {
        this.notif.color = 'success'
        this.notif.mode = 'created'
        this.items.unshift(res.data)
      } else {
        this.notif.color = 'danger'
        this.notif.mode = 'created'
      }
      this.submitLoad = false
      this.show = true
      this.totalRows = this.items.length
      this.onReset(event)
      // console.log('response result', res, res.data)
    },
    onReset(event) {
      console.log('ON RESET')
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.dob = ''
      this.form.gender = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    onEditSubmit() {
      this.editProcessing = false
      this.editProcess = true
    },
    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
    },
    onCancel() {
      this.editProcess = false
    },
    onOK(event, id) {
      this.editProcessing = true
      this.clearInterval()
      this.interval = setInterval(() => {
        if (this.waiting < 20) {
          this.waiting = this.waiting + 1
        } else {
          this.clearInterval()
          this.$nextTick(() => {
            this.onEditSave(event, id)
            // this.editProcess = this.editProcessing = false
          })
        }
      }, 350)
    },
    async onEditSave(event, id) {
      console.log('ON EDIT SUBMIT', id)
      event.preventDefault()
      const age = this.getAge(this.form.dob)
      this.form.age = age
      const firstName = this.form.name.split(' ')[0]
      const lastName = this.form.name.split(' ').pop()
      const req = {
        email: this.form.email,
        name: { first: firstName, last: lastName },
        age: this.form.age,
        gender: this.form.gender,
        dob: this.form.dob,
        isActive: this.form.isActive,
      }
      console.log('UPDATE', req)
      this.$root.$emit('bv::hide::modal', this.infoModal.id)

      // alert(JSON.stringify(req))
      this.show = false
      const res = await this.$axios.put(`/doers/${this.form.id}`, req)
      if (res.data) {
        this.notif.color = 'success'
        this.notif.mode = 'updated'
        const itemIndex = this.items.findIndex((obj) => obj.id === res.data.id)
        if (itemIndex > -1) {
          this.items[itemIndex] = res.data
          console.log('itemIndex', itemIndex, this.items[itemIndex])
          this.$root.$emit('bv::refresh::table', 'data-table')
        } else {
          this.notif.mode = 'updated'
          this.notif.color = 'danger'
        }
        // this.items.push(res.data)
      } else {
        this.notif.mode = 'updated'
        this.notif.color = 'danger'
      }
      this.show = true
      this.editProcess = this.editProcessing = false
      // console.log('response result', res, res.data)
    },
    onEditReset(event) {
      console.log('ON EDIT RESET')
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.dob = ''
      this.form.gender = null
      this.form.isActive = true
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {})
      // this.$nextTick(() => {
      //   this.show = true
      // })
    },
    async onDelete(event, id) {
      event.preventDefault()
      this.deleteLoad = false
      this.deleteLoad = true
      console.log(id)
      const res = await this.$axios.delete(`/doers/${id}`)
      console.log('RES DEL', res)
      this.show = false

      if (res.statusText === 'OK') {
        this.notif.color = 'success'
        this.notif.mode = 'deleted'
        const itemIndex = this.items.findIndex((obj) => obj.id === id)
        if (itemIndex > -1) {
          this.items.splice(itemIndex, 1)
          console.log('itemIndex', itemIndex, this.items[itemIndex])
          this.$root.$emit('bv::refresh::table', 'data-table')
        } else {
          this.notif.mode = 'deleted'
          this.notif.color = 'danger'
        }
        this.deleteLoad = false
      } else {
        this.notif.mode = 'deleted'
        this.notif.color = 'danger'
      }
      this.show = true
      this.totalRows = this.items.length
    },
    onConfirm() {
      // Focus the dialog prompt
      this.$refs.confirmDialog.focus()
    },
    onHidden() {
      // In this case, we return focus to the submit button
      // You may need to alter this based on your application requirements
      this.$refs.btnEditSubmit.focus()
    },
  },
}
</script>