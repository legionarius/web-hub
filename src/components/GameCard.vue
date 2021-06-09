<template>
  <!--    TODO: regler default qui ne doit pas être necessaire-->
  <img
    id="img-presentation"
    :src="props.gameImgPath"
    :alt="`${props.gameName} presentation`"
    @click="goToGamePage"
  />
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "GameCard",
  props: {
    gameName: {
      type: String,
      required: true,
    },
    gameImgPath: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    function goToGamePage() {
      router.push({ name: props.gameName });
    }

    return {
      props,
      goToGamePage,
    };
  },
});
</script>

<style scoped>
#img-presentation {
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

#img-presentation:hover {
  transform: scale(1.1);
}
</style>
