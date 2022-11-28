<template>
  <div>
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
            <b-col cols="8">
              <b-button type="reset" variant="danger">Reset</b-button>
              <b-button type="submit" variant="primary" class="float-right"
                >Submit</b-button
              >
            </b-col>
          </b-row>
        </b-form>
      </div>
  </div>
</template>

<script>
export default {

}
</script>
