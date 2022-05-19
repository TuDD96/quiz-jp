<template>
  <div class="card m-3">
    <h5 class="card-header" :style="{ color: Color.aqua }">
      <p>{{ Color.aqua }}</p>
      <button @click="warn('test')">change</button>
    </h5>
    <div class="card-body">
      <a class="btn btn-primary"><IconFacebook /> | Facebook</a>
      <a class="btn btn-danger"><i class="fa fa-ban"></i> | Banned</a>
      <a class="btn btn-success"> <i class="fa fa-trophy"></i> | Trophy </a>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import IconFacebook from "@/components/icons/IconFacebook.vue";
import FirestoreService from "@/services/firestore";

export default {
  components: {
    IconFacebook,
  },
  data() {},
  created() {
    this.mock200({ name: "12" });
  },
  methods: {
    ...mapActions({
      mock200: "Test/MOCK_200",
      mock401: "Test/MOCK_401",
      mock403: "Test/MOCK_403",
      mock404: "Test/MOCK_404",
      mock500: "Test/MOCK_500",
      mock503: "Test/MOCK_503",
    }),
    async testFirebase() {
      const dataObj = {
        firstName: "John2",
        lastName: "Doe",
        dob: "1990",
      };
      const service = await FirestoreService.snapshotDocument(
        "/users",
        "VvWYAKrC2zTrEuxqpAdt",
        (response) => this.callbackFunc(response)
      );
    },
    callbackFunc(response) {},
  },
};
</script>

<style lang="scss" scoped>
@import "@/sass/LoginPage.scss";
</style>
