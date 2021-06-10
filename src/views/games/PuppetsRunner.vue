<template>
  <div class="about">
    <game-container
      game-path="puppets-runner"
      :pck-file-size="10669712"
      :wasm-file-size="1310540"
    ></game-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameContainer from "@/components/GameContainer.vue";

export default defineComponent({
  name: "PuppetsRunner",
  components: {
    GameContainer,
  },
});
</script>
