<template>
  <div>
    <canvas id="canvas">
      HTML5 canvas appears to be unsupported in the current browser.<br />
      Please try updating or use a different browser.
    </canvas>
    <div id="status">
      <div id="status-progress" style="display: none">
        <div id="status-progress-inner"></div>
      </div>
      <div id="status-indeterminate" style="display: none">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div id="status-notice" class="godot" style="display: none"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onUnmounted } from "vue";
import { Engine } from "@/godot/godot.js";

export default defineComponent({
  name: "GameContainer",
  props: {
    gamePath: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const GODOT_CONFIG = {
      args: [],
      canvasResizePolicy: 1,
      executable: `godot/${props.gamePath}/index`,
      experimentalVK: false,
      fileSizes: { "index.pck": 13681728, "index.wasm": 1270027 },
      gdnativeLibs: [`godot/${props.gamePath}/libgdnative.wasm`],
    };
    const engine = new Engine(GODOT_CONFIG);

    function displayFailureNotice(err) {
      var msg = err.message || err;
      console.error("Erreur de chargemebt", msg);
    }
    engine
      .startGame({
        onProgress: function (current, total) {
          console.log(`current: ${current}; total: ${total}`);
        },
      })
      .then(() => {
        console.log("game started");
      }, displayFailureNotice);

    onUnmounted(() => {
      engine.requestQuit();
      console.log("unmount");
    });
  },
});
</script>

<style scoped>
body {
  touch-action: none;
  margin: 0;
  border: 0 none;
  padding: 0;
  text-align: center;
  background-color: black;
}

#canvas {
  color: white;
  width: 1800px;
  height: 1013px;
}

#canvas:focus {
  outline: none;
}

.godot {
  font-family: "Noto Sans", "Droid Sans", Arial, sans-serif;
  color: #e0e0e0;
  background-color: #3b3943;
  background-image: linear-gradient(to bottom, #403e48, #35333c);
  border: 1px solid #45434e;
  box-shadow: 0 0 1px 1px #2f2d35;
}

/* Status display
 * ============== */

#status {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  /* don't consume click events - make children visible explicitly */
  visibility: hidden;
}

#status-progress {
  width: 366px;
  height: 7px;
  background-color: #38363a;
  border: 1px solid #444246;
  padding: 1px;
  box-shadow: 0 0 2px 1px #1b1c22;
  border-radius: 2px;
  visibility: visible;
}

@media only screen and (orientation: portrait) {
  #status-progress {
    width: 61.8%;
  }
}

#status-progress-inner {
  height: 100%;
  width: 0;
  box-sizing: border-box;
  transition: width 0.5s linear;
  background-color: #202020;
  border: 1px solid #222223;
  box-shadow: 0 0 1px 1px #27282e;
  border-radius: 3px;
}

#status-indeterminate {
  visibility: visible;
  position: relative;
}

#status-indeterminate > div {
  width: 4.5px;
  height: 0;
  border-style: solid;
  border-width: 9px 3px 0 3px;
  border-color: #2b2b2b transparent transparent transparent;
  transform-origin: center 21px;
  position: absolute;
}

#status-indeterminate > div:nth-child(1) {
  transform: rotate(22.5deg);
}
#status-indeterminate > div:nth-child(2) {
  transform: rotate(67.5deg);
}
#status-indeterminate > div:nth-child(3) {
  transform: rotate(112.5deg);
}
#status-indeterminate > div:nth-child(4) {
  transform: rotate(157.5deg);
}
#status-indeterminate > div:nth-child(5) {
  transform: rotate(202.5deg);
}
#status-indeterminate > div:nth-child(6) {
  transform: rotate(247.5deg);
}
#status-indeterminate > div:nth-child(7) {
  transform: rotate(292.5deg);
}
#status-indeterminate > div:nth-child(8) {
  transform: rotate(337.5deg);
}

#status-notice {
  margin: 0 100px;
  line-height: 1.3;
  visibility: visible;
  padding: 4px 6px;
  visibility: visible;
}
</style>
