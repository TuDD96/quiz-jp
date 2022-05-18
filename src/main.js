import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as VeeValidate from "vee-validate";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(VeeValidate, {
  inject: true,
  fieldsBagName: "$veeFields",
  errorBagName: "$veeErrors",
});

app.mount("#app");
