<template>
  <div v-if="notifs">
    <b-alert
      v-model="notifs.show"
      class="mt-3"
      :variant="notifs.color"
      dismissible
      @dismissed="dismissed"
    >
      {{
        notif.color != 'danger'
          ? 'Congrats! Data successfully created.'
          : 'Sorry! Data creation failed.'
      }}
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'AlertNotif',
  props: {
    notif: {
      type: Object,
      default: null,
    },
  },
  computed: {
    notifs: function () {
      return this.notif ? this.notif : null
    },
  },
  created() {
    console.log(this.notif)
  },
  methods: {
    dismissed() {
      console.log('Alert Dismissed')
    },
  },
}
</script>

<style>
</style>