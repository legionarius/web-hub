import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

require("./godot/index.pck");
require("./godot/index.wasm");
require("./godot/index.side.wasm");
require("./godot/libgdnative.wasm");

createApp(App).use(router).mount("#app");
