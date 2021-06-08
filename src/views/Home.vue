<template>
  <div id="games-container">
    <game-card
      v-for="game in games"
      :game-name="game.name"
      :game-img-path="game.imgPath"
      :key="game.name"
      class="game-card"
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
<style scoped>
#games-container {
  display: inline-block;
  margin-top: 100px;
}

.game-card{
  margin-left: 10px;
  margin-right: 10px;
}
</style>
