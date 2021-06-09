import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// require("./godot/puppets-runner/index.pck");
// require("./godot/puppets-runner/index.wasm");
// require("./godot/puppets-runner/index.side.wasm");
// require("./godot/puppets-runner/libgdnative.wasm");

require("./godot/alien-abduction/index.pck");
require("./godot/alien-abduction/index.wasm");
require("./godot/alien-abduction/index.side.wasm");
require("./godot/alien-abduction/libgdnative.wasm");

require("./godot/landlord/index.pck");
require("./godot/landlord/index.wasm");
require("./godot/landlord/index.side.wasm");
require("./godot/landlord/libgdnative.wasm");

createApp(App).use(router).mount("#app");
