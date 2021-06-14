<template>
  <div>
    <canvas id="canvas">
      HTML5 canvas appears to be unsupported in the current browser.<br />
      Please try updating or use a different browser.
    </canvas>
    <div id="status">
      <div id="status-progress" ref="statusProgress">
        <div id="status-progress-inner" ref="statusProgressInner"></div>
      </div>
      <div ref="statusIndeterminate" id="status-indeterminate">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div
        ref="statusNotice"
        id="status-notice"
        class="godot"
        style="display: none"
      ></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

export default defineComponent({
  name: "GameContainer",
  props: {
    gamePath: {
      type: String,
      required: true,
    },
    pckFileSize: {
      type: Number,
      required: true,
    },
    wasmFileSize: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const statusProgress = ref(null);
    const statusIndeterminate = ref(null);
    const statusProgressInner = ref(null);

    const INDETERMINATE_STATUS_STEP_MS = 100;
    const GODOT_CONFIG = {
      args: [],
      canvasResizePolicy: 1,
      executable: `godot/${props.gamePath}/index`,
      experimentalVK: false,
      fileSizes: {
        [`godot/${props.gamePath}/index.pck`]: props.pckFileSize,
        [`godot/${props.gamePath}/index.wasm`]: props.wasmFileSize,
      },
      gdnativeLibs: [`godot/${props.gamePath}/libgdnative.wasm`],
    };
    let engine = null;
    var animationCallbacks = [];

    function setStatusMode(mode) {
      [statusProgress, statusIndeterminate].forEach((elem) => {
        elem.value.style.display = "none";
      });
      switch (mode) {
        case "progress":
          statusProgress.value.style.display = "block";
          break;
        case "indeterminate":
          statusIndeterminate.value.style.display = "block";
          animationCallbacks.push(animateStatusIndeterminate);
          break;
        case "hidden":
          break;
        default:
          throw new Error("Invalid status mode");
      }
    }

    function animateStatusIndeterminate(ms) {
      const i = Math.floor((ms / INDETERMINATE_STATUS_STEP_MS) % 8);
      if (statusIndeterminate.value.children[i].style.borderTopColor == "") {
        Array.prototype.slice
          .call(statusIndeterminate.value.children)
          .forEach((child) => {
            child.style.borderTopColor = "";
          });
        statusIndeterminate.value.children[i].style.borderTopColor = "#dfdfdf";
      }
    }

    function displayFailureNotice(err) {
      let msg = err.message || err;
      console.error("Erreur de chargement", msg);
    }

    onMounted(() => {
      setStatusMode("indeterminate");
      Promise.all([
        import("@/godot/godot.js"),
        import(`../godot/${props.gamePath}/index.pck`),
        import(`../godot/${props.gamePath}/index.wasm`),
        import(`../godot/${props.gamePath}/index.side.wasm`),
        import(`../godot/${props.gamePath}/libgdnative.wasm`),
      ]).then(([{ Engine }]) => {
        engine = new Engine(GODOT_CONFIG);

        if (!Engine.isWebGLAvailable()) {
          displayFailureNotice("WebGL not available");
        } else {
          engine
            .startGame({
              onProgress: function (current, total) {
                if (total > 0) {
                  statusProgressInner.value.style.width = `${
                    (current / total) * 100
                  }%`;
                  setStatusMode("progress");
                  if (current === total) {
                    setTimeout(() => {
                      setStatusMode("indeterminate");
                    }, 500);
                  }
                } else {
                  setStatusMode("indeterminate");
                }
              },
            })
            .then(() => {
              setStatusMode("hidden");
            }, displayFailureNotice);
        }
      });
    });

    onUnmounted(() => {
      engine.requestQuit();
    });

    return {
      statusProgress,
      statusIndeterminate,
      statusProgressInner,
    };
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
  display: none;
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
