import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

require("./godot/index.pck");
require("./godot/index.wasm");
createApp(App).use(router).mount("#app");
