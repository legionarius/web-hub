<template>
  <div id="layout-container">
    <img
      id="logo"
      :src="require('../assets/logo.png').default"
      alt="logo"
      @click="goToHome"
    />
  </div>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AlienAbduction",
  setup() {
    const router = useRouter();

    function goToHome() {
      router.push({ name: "Home" });
    }

    return {
      goToHome,
    };
  },
});
</script>

<style scoped>
#layout-container {
  width: 100%;
  background-color: #f7eccc;
}

#logo {
  width: 80px;
  height: 80px;
  cursor: pointer;
}
</style>
