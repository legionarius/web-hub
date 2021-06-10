<template>
  <div class="about">
    <game-container
      game-path="landlord"
      :pck-file-size="29292752"
      :wasm-file-size="1310540"
    ></game-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameContainer from "@/components/GameContainer.vue";

export default defineComponent({
  name: "Landlord",
  components: {
    GameContainer,
  },
});
</script>
