<template>
  <div class="about">
    <game-container game-path="alien-abduction"></game-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameContainer from "@/components/GameContainer.vue";

export default defineComponent({
  name: "AlienAbduction",
  components: {
    GameContainer,
  },
});
</script>
