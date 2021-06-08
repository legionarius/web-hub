<template>
  <div class="home">
    <game-card
      v-for="game in games"
      :game-name="game.name"
      :game-img-path="game.imgPath"
      :key="game.name"
    ></game-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameCard from "@/components/GameCard.vue";

export default defineComponent({
  name: "Home",
  components: {
    GameCard,
  },
  setup() {
    interface Game {
      name: string;
      imgPath: string;
    }
    const games: Game[] = [
      {
        name: "AlienAbduction",
        imgPath: require("../assets/alien-abduction.png"),
      },
      {
        name: "Landlord",
        imgPath: require("../assets/landlord.png"),
      },
      {
        name: "PuppetsRunner",
        imgPath: require("../assets/puppets-runner.png"),
      },
    ];

    return {
      games,
    };
  },
});
</script>
