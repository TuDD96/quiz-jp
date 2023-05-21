/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Form, Field } from "vee-validate";
import i18n from "@/utils/i18n";
import log from "./utils/log";
import Color from "./configs/Color";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/sass/app.scss";

// eslint-disable-next-line no-console
const app = createApp(App);

// package use
app.use(router);
app.use(store);
app.use(i18n);

// component global
app.component("Form", Form);
app.component("Field", Field);

// variable global
app.config.globalProperties.Color = Color;

// function global
app.mixin({
  methods: { ...log },
});

app.mount("#app");
