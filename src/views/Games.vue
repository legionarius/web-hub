<template>
  <div class="about">
    <game-container></game-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameContainer from "@/components/GameContainer.vue";

export default defineComponent({
  name: "Home",
  components: {
    GameContainer,
  },
});
</script>
